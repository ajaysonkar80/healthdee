import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, like, or, sql, type SQL } from "drizzle-orm";

import { db } from "@/db";
import { users, doctors } from "@/db/schema";
import { authorizeAdmin } from "@/lib/auth";
import { doctorCreateSchema } from "@/lib/validators";

/* ============================
   GET: List doctors (admin)
============================ */
export async function GET(request: NextRequest) {
  const { response } = await authorizeAdmin(request);
  if (response) return response;

  const { searchParams } = request.nextUrl;

  const page = Math.max(Number(searchParams.get("page") ?? "1"), 1);
  const pageSize = Math.min(
    Math.max(Number(searchParams.get("pageSize") ?? "20"), 1),
    100
  );

  const search = searchParams.get("search")?.trim();
  const rawStatus = searchParams.get("status")?.trim();

  const status =
    rawStatus && ["pending", "verified", "rejected"].includes(rawStatus)
      ? (rawStatus as "pending" | "verified" | "rejected")
      : undefined;

  if (rawStatus && !status) {
    return NextResponse.json(
      { error: "Invalid status filter" },
      { status: 400 }
    );
  }

  const filters: SQL[] = [eq(users.role, "doctor")];

  if (status) {
    filters.push(eq(doctors.verificationStatus, status));
  }

  if (search) {
    const searchValue = `%${search}%`;

    filters.push(
      or(
        like(doctors.publicId, searchValue),
        like(doctors.specialty, searchValue),
        like(doctors.rmpRegistrationNumber, searchValue)
      )!
    );
  }

  const whereClause = and(...filters);
  const offset = (page - 1) * pageSize;

  const data = await db
    .select({
      id: users.id,
      role: users.role,
      status: users.status,
      createdAt: users.createdAt,

      doctorId: doctors.id,
      publicId: doctors.publicId,
      specialty: doctors.specialty,
      experienceYears: doctors.experienceYears,
      rating: doctors.rating,
      verificationStatus: doctors.verificationStatus,
      verifiedAt: doctors.verifiedAt,
      profileImageUrl: doctors.profileImageUrl,
    })
    .from(users)
    .innerJoin(doctors, eq(doctors.userId, users.id))
    .where(whereClause)
    .orderBy(desc(users.createdAt))
    .limit(pageSize)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .innerJoin(doctors, eq(doctors.userId, users.id))
    .where(whereClause);

  return NextResponse.json({
    data,
    page,
    pageSize,
    total: count,
    totalPages: Math.ceil(count / pageSize),
  });
}

/* ============================
   POST: Create doctor (admin)
============================ */
export async function POST(request: NextRequest) {
  const { response } = await authorizeAdmin(request);
  if (response) return response;

  const parsed = doctorCreateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { profile } = parsed.data;

  // Create user
  const [user] = await db
    .insert(users)
    .values({
      role: "doctor",
      status: "active",
    })
    .returning({ id: users.id });

  // Create doctor profile
  const [doctor] = await db
    .insert(doctors)
    .values({
      userId: user.id,
      publicId: crypto.randomUUID(),
      specialty: profile.specialty,
      experienceYears: profile.yearsOfExperience ?? 0,
      rating: 0,
      profileImageUrl: profile.profileImageUrl ?? null,
      rmpRegistrationNumber: profile.rmpRegistrationNumber,
      rmpStateMedicalCouncil: profile.rmpStateMedicalCouncil,
      verificationStatus: profile.verificationStatus ?? "pending",
    })
    .returning();

  return NextResponse.json(
    {
      data: {
        user,
        doctor,
      },
    },
    { status: 201 }
  );
}
