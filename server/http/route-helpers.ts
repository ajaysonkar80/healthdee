import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { error } from "./response";

/**
 * Context passed by Next.js App Router
 */
export type RouteContext = {
  params?: Record<string, string>;
};

/**
 * Base API route handler type
 */
export type RouteHandler = (
  req: NextRequest,
  ctx: RouteContext
) => Promise<Response>;

/**
 * Centralized error handling wrapper
 */
export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Internal Server Error");

      return error({
        message: e.message,
        status: (e as Error & { status?: number }).status ?? 500,
      });
    }
  };
}

/**
 * Requires authenticated user (set by auth middleware)
 */
export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    const auth = (req as NextRequest & { auth?: { userId?: string } }).auth;

    if (!auth?.userId) {
      return error({
        message: "Unauthorized",
        status: 401,
      });
    }

    return handler(req, ctx);
  };
}

/**
 * Request validation wrapper
 */
export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (
    req: NextRequest & { validated: T },
    ctx: RouteContext
  ) => Promise<Response>
): RouteHandler {
  return async (req, ctx) => {
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

    return handler(validatedReq, ctx);
  };
}
