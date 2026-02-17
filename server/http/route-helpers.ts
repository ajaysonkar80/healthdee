import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { verifyAccessToken } from "@/server/utils/jwt";
import { error } from "./response";
import { BaseAppError } from "@/server/utils/errors";

/* ======================================================
   Types
====================================================== */

type RouteHandler = (
  req: NextRequest,
  context?: unknown
) => Promise<Response>;

/* ======================================================
   Error Handling
====================================================== */
/* ======================================================
   Error Handling (Dev + Prod Safe)
====================================================== */

export function withErrorHandling(
  handler: RouteHandler
): RouteHandler {
  return async (
    req: NextRequest,
    context?: unknown
  ): Promise<Response> => {
    try {
      return await handler(req, context);
    } catch (err) {
      const isDev = process.env.NODE_ENV === "development";
      
      if (isDev) {
        console.error("🔥 FULL ERROR STACK:");
        console.error(err);
}

      if (err instanceof BaseAppError) {
        return error({
          message: err.message,
          status: err.statusCode,
          ...(isDev && { stack: err.stack }),
        });
      }

      if (err instanceof Error) {
        if (isDev) {
          console.error("🔥 DEV ERROR:", err);
        }

        return error({
          message: err.message,
          status: 500,
          ...(isDev && { stack: err.stack }),
        });
      }

      return error({
        message: "Internal Server Error",
        status: 500,
        ...(isDev && { stack: "Unknown error type" }),
      });
    }
  };
}
/* ======================================================
   Validation Middleware
====================================================== */

export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (
    req: NextRequest & { validated: T },
    context?: unknown
  ) => Promise<Response>
): RouteHandler {
  return async (req: NextRequest, context?: unknown) => {
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

/* ======================================================
   Auth Guard (Stable Version)
====================================================== */

export function withAuth(
  handler: (
    req: NextRequest & {
      auth: { userId: string; role: string };
    },
    context?: unknown
  ) => Promise<Response>
): RouteHandler {
  return async (
    req: NextRequest,
    context?: unknown
  ): Promise<Response> => {
    let token: string | undefined;

    // 1️⃣ Authorization header
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }

    // 2️⃣ Cookie fallback (CRITICAL FIX: use req.cookies)
    if (!token) {
      token = req.cookies.get("access_token")?.value;
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

      const authedReq = Object.assign(req, {
        auth: {
          userId: payload.sub,
          role: payload.role,
        },
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
