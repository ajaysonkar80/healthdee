// server/utils/errors.ts

/**
 * Base error class for all application-level errors.
 * This is intentionally minimal and dependency-free.
 */
export class BaseAppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Fix prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when authentication fails or user is not logged in.
 * Maps to HTTP 401.
 */
export class AuthError extends BaseAppError {
  constructor(message: string = "Authentication required") {
    super(message, 401);
  }
}

/**
 * Thrown when user input fails validation.
 * Maps to HTTP 400.
 */
export class ValidationError extends BaseAppError {
  public readonly details?: Record<string, string>;

  constructor(
    message: string = "Validation failed",
    details?: Record<string, string>
  ) {
    super(message, 400);
    this.details = details;
  }
}

/**
 * Thrown when the user is authenticated but lacks permission.
 * Maps to HTTP 403.
 */
export class ForbiddenError extends BaseAppError {
  constructor(message: string = "Access forbidden") {
    super(message, 403);
  }
}

/**
 * Thrown when a requested resource cannot be found.
 * Maps to HTTP 404.
 */
export class NotFoundError extends BaseAppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}
