import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type AuthorizeResult = {
  response?: NextResponse;
};

export async function authorizeAdmin(
  request: Request
): Promise<AuthorizeResult> {
  // ✅ cookies() is async in your Next.js version
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return {
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  // Example role check (adjust later)
  const role = request.headers.get("x-user-role");

  if (role !== "admin") {
    return {
      response: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return {};
}
