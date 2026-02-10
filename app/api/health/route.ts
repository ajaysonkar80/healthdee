import { withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const GET = withErrorHandling(async () => {
  // Minimal DB connectivity check
  await db.run(sql`SELECT 1`);

  return success({
    status: "ok",
    timestamp: Date.now(),
  });
});
