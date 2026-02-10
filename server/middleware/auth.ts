import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function authMiddleware(req: NextRequest) {
  const header = req.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // @ts-expect-error extend request
    req.auth = {
      userId: payload.sub,
      role: payload.role,
      tokenPayload: payload,
    };
  } catch {
    // invalid token → ignore, enforcement happens later
  }
}
