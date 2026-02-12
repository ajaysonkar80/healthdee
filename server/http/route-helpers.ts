import { cookies } from "next/headers";
import { verifyAccessToken } from "@/server/utils/jwt";
import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { error } from "./response";

/**
 * Next.js-compatible route handler.
 * We intentionally do NOT type the context,
 * because Next.js owns it and may change it.
 */
type RouteHandler = (
  req: NextRequest,
  context?: unknown
) => Promise<Response>;

/* --------------------------------------------------
   Error Handling
--------------------------------------------------- */
export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (err) {
      if (err instanceof Error) {
        return error({
          message: err.message,
          status: (err as Error & { status?: number }).status ?? 500,
        });
      }

      return error({
        message: "Internal Server Error",
        status: 500,
      });
    }
  };
}

/* --------------------------------------------------
   Auth Guard
--------------------------------------------------- */
export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    let token: string | undefined;

    // 1️⃣ Try Authorization header
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }

    // 2️⃣ Fallback to access_token cookie
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("access_token")?.value;
    }

    if (!token) {
      return error({
        message: "Unauthorized",
        status: 401,
      });
    }

    try {
      const payload = verifyAccessToken(token);

      if (
        typeof payload !== "object" ||
        payload === null ||
        typeof payload.sub !== "string" ||
        (payload.role !== "admin" &&
          payload.role !== "doctor" &&
          payload.role !== "patient")
      ) {
        return error({
          message: "Unauthorized",
          status: 401,
        });
      }

      const authContext = {
        userId: payload.sub,
        role: payload.role,
      };

      const authedReq = Object.assign(req, {
        auth: authContext,
      }) as NextRequest & {
        auth: { userId: string; role: string };
      };

      return handler(authedReq, context);
    } catch {
      return error({
        message: "Unauthorized",
        status: 401,
      });
    }
  };
}

/* --------------------------------------------------
   Validation
--------------------------------------------------- */
export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (
    req: NextRequest & { validated: T },
    context?: unknown
  ) => Promise<Response>
): RouteHandler {
  return async (req, context) => {
    const input =
      req.method === "GET"
        ? Object.fromEntries(req.nextUrl.searchParams)
        : await req.json();

    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      return error({
        message: "Validation failed",
        status: 422,
        code: "VALIDATION_ERROR",
      });
    }

    const validatedReq = Object.assign(req, {
      validated: parsed.data,
    }) as NextRequest & { validated: T };

    return handler(validatedReq, context);
  };
}
