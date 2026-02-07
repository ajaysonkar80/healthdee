// server/utils/logger.ts

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  [key: string]: unknown;
}

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
}
/** commented out isDev
const isDev =
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "test";
**/
/**
 * Color helpers (no dependencies)
 */
const colors = {
  debug: "\x1b[90m", // gray
  info: "\x1b[34m", // blue
  warn: "\x1b[33m", // yellow
  error: "\x1b[31m", // red
  reset: "\x1b[0m",
};

class Logger {
  private log(level: LogLevel, message: string, context?: LogContext): void {
    const payload: LogPayload = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
    };

    if (true) {
      this.prettyPrint(payload);
      return;
    }

    // Production: structured JSON logs
    switch (level) {
      case "warn":
        console.warn(payload);
        break;
      case "error":
        console.error(payload);
        break;
      default:
        console.log(payload);
    }
  }

  private prettyPrint(payload: LogPayload): void {
    const { level, message, timestamp, context } = payload;
    const color = colors[level];
    const time = new Date(timestamp).toLocaleTimeString();

    const header = `${color}[${level.toUpperCase()}]${colors.reset}`;
    const line = `${header} ${time} - ${message}`;

    switch (level) {
      case "warn":
        console.warn(line);
        break;
      case "error":
        console.error(line);
        break;
      default:
        console.log(line);
    }

    if (context && Object.keys(context).length > 0) {
      console.log(
        `${color}└─ context:${colors.reset}`,
        context
      );
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log("error", message, context);
  }
}

export const logger = new Logger();
