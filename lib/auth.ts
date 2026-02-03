import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface AuthUser {
  id: string;
  role: "patient" | "doctor" | "admin";
}

interface AuthorizeResult {
  user: AuthUser;
  response?: NextResponse;
}

const AUTH_HEADER_PREFIX = "Bearer ";

function getUserIdFromBearerToken(token: string | null) {
  if (!token?.startsWith(AUTH_HEADER_PREFIX)) {
    return null;
  }

  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    return null;
  }

  const rawToken = token.slice(AUTH_HEADER_PREFIX.length);
  const [userId, signature] = rawToken.split(".");

  if (!userId || !signature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret).update(userId).digest("hex");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  return userId;
}

function getUserIdFromRequest(request: NextRequest) {
  const bearerUserId = getUserIdFromBearerToken(request.headers.get("authorization"));

  if (bearerUserId) {
    return bearerUserId;
  }

  if (process.env.ALLOW_INSECURE_ADMIN_HEADER === "true" && process.env.NODE_ENV !== "production") {
    return request.headers.get("x-user-id");
  }

  return null;
}

export async function authorizeAdmin(request: NextRequest): Promise<AuthorizeResult> {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return {
      user: { id: "", role: "patient" },
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { id: true, role: true },
  });

  if (!user) {
    return {
      user: { id: "", role: "patient" },
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (user.role !== "admin") {
    return {
      user,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user };
}
