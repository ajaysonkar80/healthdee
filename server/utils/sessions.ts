// server/utils/session.ts
// Server-side session helper — reads access token from cookie and returns the user.

import { cookies }           from "next/headers";
import { verifyAccessToken } from "@/server/utils/jwt";
import { userRepo }          from "@/server/repositories/user.repo";
import type { AuthUser }     from "@/app/services/auth.service";

export async function getServerUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token       = cookieStore.get("access_token")?.value;
    if (!token) return null;

    const payload = verifyAccessToken(token);
    const user    = await userRepo.getUserById(payload.sub);

    if (user.status !== "active") return null;

    return {
      id:   user.id,
      role: user.role as AuthUser["role"],
      name: user.name,
    };
  } catch {
    return null;
  }
}