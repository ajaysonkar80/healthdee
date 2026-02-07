// server/utils/password.ts

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = {
  cost: 16384,
  blockSize: 8,
  parallelization: 1,
};

/**
 * Hash a plaintext password.
 * Output format: salt:hash (both hex encoded)
 */
export function hash(password: string): string {
  if (!password) {
    throw new Error("Password is required");
  }

  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = scryptSync(
    password,
    salt,
    KEY_LENGTH,
    SCRYPT_OPTIONS
  );

  return `${salt.toString("hex")}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plaintext password against a stored hash.
 */
export function verify(password: string, storedHash: string): boolean {
  if (!password || !storedHash) {
    return false;
  }

  const [saltHex, hashHex] = storedHash.split(":");

  if (!saltHex || !hashHex) {
    return false;
  }

  const salt = Buffer.from(saltHex, "hex");
  const storedKey = Buffer.from(hashHex, "hex");

  const derivedKey = scryptSync(
    password,
    salt,
    KEY_LENGTH,
    SCRYPT_OPTIONS
  );

  // Constant-time comparison to prevent timing attacks
  return (
    storedKey.length === derivedKey.length &&
    timingSafeEqual(storedKey, derivedKey)
  );
}
