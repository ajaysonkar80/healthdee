

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  requestId?: string;
  userId?: string;
  [key: string]: unknown;
}

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
}

const isDev =
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "test";

/**
 * Terminal colors for dev logs
 */
const colors = {
  debug: "\x1b[90m",
  info: "\x1b[34m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  reset: "\x1b[0m",
};

class Logger {
  private writeStdout(message: string): void {
    process.stdout.write(message + "\n");
  }

  private writeStderr(message: string): void {
    process.stderr.write(message + "\n");
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const payload: LogPayload = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
    };

    if (isDev) {
      this.prettyPrint(payload);
      return;
    }

    // Production → structured JSON logs
    const json = JSON.stringify(payload);

    if (level === "error") {
      this.writeStderr(json);
    } else {
      this.writeStdout(json);
    }
  }

  /**
   * Dev-friendly colored logs
   */
  private prettyPrint(payload: LogPayload): void {
    const { level, message, timestamp, context } = payload;

    const color = colors[level];
    const time = new Date(timestamp).toLocaleTimeString();

    const header = `${color}[${level.toUpperCase()}]${colors.reset}`;
    const line = `${header} ${time} - ${message}`;

    if (level === "error") {
      this.writeStderr(line);
    } else {
      this.writeStdout(line);
    }

    if (context && Object.keys(context).length > 0) {
      const ctx = JSON.stringify(context, null, 2);
      this.writeStdout(`${color}└─ context:${colors.reset} ${ctx}`);
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