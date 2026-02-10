import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/server/utils/jwt";

export async function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.next();
  }

  const token = authHeader.slice(7);

  const payload = verifyAccessToken(token);

  if (
    typeof payload !== "object" ||
    payload === null ||
    typeof payload.sub !== "string" ||
    (payload.role !== "admin" &&
      payload.role !== "doctor" &&
      payload.role !== "patient")
  ) {
    return NextResponse.next();
  }

  req.auth = {
    userId: payload.sub,
    role: payload.role,
  };

  return NextResponse.next();
}
