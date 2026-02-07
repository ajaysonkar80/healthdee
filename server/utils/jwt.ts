// server/utils/jwt.ts

import { createHmac, timingSafeEqual } from "crypto";

/**
 * Claims required for all tokens
 */
export type JwtBaseClaims = {
  sub: string; // subject (usually user id)
};

/**
 * Full internal payload
 */
type JwtPayload = JwtBaseClaims & {
  iat: number;
  exp: number;
  [key: string]: unknown;
};

const ACCESS_TOKEN_TTL = 60 * 15; // 15 minutes
const REFRESH_TOKEN_TTL = 60 * 60 * 24 * 30; // 30 days

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not configured");
}

/**
 * After the runtime check above, we can safely assert types
 */
const accessSecret: string = ACCESS_TOKEN_SECRET;
const refreshSecret: string = REFRESH_TOKEN_SECRET;

/**
 * Base64URL helpers
 */
function base64UrlEncode(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(input: string): Buffer {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = input.length % 4;
  if (pad) input += "=".repeat(4 - pad);
  return Buffer.from(input, "base64");
}

/**
 * Core signing logic
 */
function signToken(
  claims: JwtBaseClaims & Record<string, unknown>,
  secret: string,
  ttlSeconds: number
): string {
  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttlSeconds;

  const payload: JwtPayload = {
    ...claims,
    iat,
    exp,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = createHmac("sha256", secret)
    .update(data)
    .digest();

  return `${data}.${base64UrlEncode(signature)}`;
}

function verifyToken(token: string, secret: string): JwtPayload {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const [headerB64, payloadB64, signatureB64] = parts;
  const data = `${headerB64}.${payloadB64}`;

  const expectedSignature = createHmac("sha256", secret)
    .update(data)
    .digest();

  const actualSignature = base64UrlDecode(signatureB64);

  if (
    expectedSignature.length !== actualSignature.length ||
    !timingSafeEqual(expectedSignature, actualSignature)
  ) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(
    base64UrlDecode(payloadB64).toString("utf8")
  ) as JwtPayload;

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    throw new Error("Token expired");
  }

  return payload;
}

/**
 * Public API
 */
export function signAccessToken(
  claims: JwtBaseClaims & Record<string, unknown> = { sub: "" }
): string {
  if (!claims.sub) {
    throw new Error("Access token requires sub");
  }

  return signToken(claims, accessSecret, ACCESS_TOKEN_TTL);
}

export function signRefreshToken(
  claims: JwtBaseClaims & Record<string, unknown> = { sub: "" }
): string {
  if (!claims.sub) {
    throw new Error("Refresh token requires sub");
  }

  return signToken(claims, refreshSecret, REFRESH_TOKEN_TTL);
}

export function verifyAccessToken(token: string): JwtPayload {
  return verifyToken(token, accessSecret);
}

export function verifyRefreshToken(token: string): JwtPayload {
  return verifyToken(token, refreshSecret);
}
