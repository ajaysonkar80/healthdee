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
    const authReq = req as NextRequest & {
      auth?: { userId?: string };
    };

    if (!authReq.auth?.userId) {
      return error({
        message: "Unauthorized",
        status: 401,
      });
    }

    return handler(req, context);
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
