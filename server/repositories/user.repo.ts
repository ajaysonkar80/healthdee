// server/repositories/user.repo.ts
import { db } from "@/db";
import * as schema from "@/db/schema";
import { and, eq, like, or, sql } from "drizzle-orm";

/* -----------------------------------------------------
   Errors
----------------------------------------------------- */

export class RepositoryError extends Error {
  constructor(
    public code: "NOT_FOUND",
    message: string
  ) {
    super(message);
  }
}

/* -----------------------------------------------------
   Pagination
----------------------------------------------------- */

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

const DEFAULT_LIMIT = 20;

function getPagination(params?: PaginationParams) {
  return {
    limit: params?.limit ?? DEFAULT_LIMIT,
    offset: params?.offset ?? 0,
  };
}

/* -----------------------------------------------------
   User Repository
----------------------------------------------------- */

export const userRepo = {
  /* -----------------------------
     Users
  ----------------------------- */

  async createUser(input: {
    role: schema.UserRole;
    status?: schema.UserStatus;
  }) {
    const now = new Date();

    const [user] = await db
      .insert(schema.users)
      .values({
        role: input.role,
        status: input.status ?? "active",
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return user;
  },

  async getUserById(userId: string) {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });

    if (!user) {
      throw new RepositoryError("NOT_FOUND", `User not found: ${userId}`);
    }

    return user;
  },

  async listUsers(
    params?: PaginationParams & {
      search?: string;
      role?: schema.UserRole;
      status?: schema.UserStatus;
    }
  ) {
    const { limit, offset } = getPagination(params);

    const conditions = [];

    if (params?.role) {
      conditions.push(eq(schema.users.role, params.role));
    }

    if (params?.status) {
      conditions.push(eq(schema.users.status, params.status));
    }

    if (params?.search) {
      conditions.push(
        or(
          like(schema.authCredentials.email, `%${params.search}%`),
          like(schema.authCredentials.whatsappPhone, `%${params.search}%`)
        )
      );
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [{ count }]] = await Promise.all([
      db
        .select({
          id: schema.users.id,
          role: schema.users.role,
          status: schema.users.status,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users)
        .leftJoin(
          schema.authCredentials,
          eq(schema.authCredentials.userId, schema.users.id)
        )
        .where(whereClause)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.users)
        .leftJoin(
          schema.authCredentials,
          eq(schema.authCredentials.userId, schema.users.id)
        )
        .where(whereClause),
    ]);

    return { data, total: count };
  },

  async deactivateUser(userId: string) {
    const now = new Date();

    const result = await db
      .update(schema.users)
      .set({
        status: "deactivated",
        updatedAt: now,
      })
      .where(eq(schema.users.id, userId))
      .returning();

    if (result.length === 0) {
      throw new RepositoryError("NOT_FOUND", `User not found: ${userId}`);
    }

    return result[0];
  },

  /* -----------------------------
     Auth Credentials
  ----------------------------- */

  async createAuthCredentials(input: {
    userId: string;
    email?: string;
    passwordHash?: string;
    whatsappPhone?: string;
  }) {
    const now = new Date();

    const [credentials] = await db
      .insert(schema.authCredentials)
      .values({
        userId: input.userId,
        email: input.email,
        passwordHash: input.passwordHash,
        whatsappPhone: input.whatsappPhone,
        createdAt: now,
      })
      .returning();

    return credentials;
  },

  async getAuthByEmail(email: string) {
    const record = await db.query.authCredentials.findFirst({
      where: eq(schema.authCredentials.email, email),
    });

    if (!record) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Auth credentials not found for email: ${email}`
      );
    }

    return record;
  },

  async getAuthByWhatsapp(phone: string) {
    const record = await db.query.authCredentials.findFirst({
      where: eq(schema.authCredentials.whatsappPhone, phone),
    });

    if (!record) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Auth credentials not found for phone: ${phone}`
      );
    }

    return record;
  },

  async updateLastLogin(userId: string) {
    const now = new Date();

    const result = await db
      .update(schema.authCredentials)
      .set({
        lastLoginAt: now,
      })
      .where(eq(schema.authCredentials.userId, userId))
      .returning();

    if (result.length === 0) {
      throw new RepositoryError(
        "NOT_FOUND",
        `Auth credentials not found for user: ${userId}`
      );
    }

    return result[0];
  },

  /* -----------------------------
     OTP Sessions
  ----------------------------- */

  async createOtpSession(input: {
    userId?: string;
    channel: schema.OtpChannel;
    destination: string;
    otpHash: string;
    expiresAt: Date;
  }) {
    const now = new Date();

    const [otp] = await db
      .insert(schema.otpSessions)
      .values({
        userId: input.userId,
        channel: input.channel,
        destination: input.destination,
        otpHash: input.otpHash,
        expiresAt: input.expiresAt,
        createdAt: now,
      })
      .returning();

    return otp;
  },

  async getValidOtpSession(destination: string, channel: schema.OtpChannel) {
    const otp = await db.query.otpSessions.findFirst({
      where: and(
        eq(schema.otpSessions.destination, destination),
        eq(schema.otpSessions.channel, channel),
        sql`${schema.otpSessions.expiresAt} > CURRENT_TIMESTAMP`,
        sql`${schema.otpSessions.verifiedAt} IS NULL`
      ),
    });

    if (!otp) {
      throw new RepositoryError("NOT_FOUND", "Valid OTP session not found");
    }

    return otp;
  },

  async markOtpVerified(otpId: string) {
    const now = new Date();

    const result = await db
      .update(schema.otpSessions)
      .set({
        verifiedAt: now,
      })
      .where(eq(schema.otpSessions.id, otpId))
      .returning();

    if (result.length === 0) {
      throw new RepositoryError("NOT_FOUND", `OTP session not found: ${otpId}`);
    }

    return result[0];
  },

  async deleteExpiredOtps() {
    await db
      .delete(schema.otpSessions)
      .where(sql`${schema.otpSessions.expiresAt} <= CURRENT_TIMESTAMP`);
  },

  async storeRefreshToken(input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) {
  await db.insert(schema.refreshTokens).values({
    userId: input.userId,
    tokenHash: input.tokenHash,
    expiresAt: input.expiresAt,
  });
},

async findValidRefreshToken(tokenHash: string) {
  return db.query.refreshTokens.findFirst({
    where: sql`
      ${schema.refreshTokens.tokenHash} = ${tokenHash}
      AND ${schema.refreshTokens.expiresAt} > ${new Date()}
    `,
  });
},

async deleteRefreshToken(tokenHash: string) {
  await db
    .delete(schema.refreshTokens)
    .where(sql`${schema.refreshTokens.tokenHash} = ${tokenHash}`);
},

async deleteAllUserRefreshTokens(userId: string) {
  await db
    .delete(schema.refreshTokens)
    .where(sql`${schema.refreshTokens.userId} = ${userId}`);
},

};
