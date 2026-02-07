// server/utils/logger_test.ts

// Force dev mode so pretty logs are used
//process.env.NODE_ENV = "development";

import { logger } from "./logger";

logger.debug("Debugging auth flow", { step: "token-parse" });
logger.info("User logged in", { userId: "123" });
logger.warn("Rate limit approaching", { ip: "127.0.0.1" });
logger.error("Database connection failed", { retry: false });
