import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load the environment file
dotenv.config({ path: '.env' });

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error('❌ TURSO_DATABASE_URL is missing. Check your .env file.');
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error('❌ TURSO_AUTH_TOKEN is missing. Check your .env file.');
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "turso", // ✅ Use 'sqlite', do not use 'driver: turso'
  dbCredentials: {
    url:process.env.TURSO_DATABASE_URL,
    authToken:process.env.TURSO_AUTH_TOKEN,
  },
});