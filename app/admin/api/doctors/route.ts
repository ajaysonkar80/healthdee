import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, like, or, sql, type SQL } from "drizzle-orm";

import { db } from "@/db";
import { users, doctorProfiles } from "@/db/schema";
import { authorizeAdmin } from "@/lib/auth";
import { doctorCreateSchema } from "@/lib/validators";

type VerificationStatus = "pending" | "approved" | "rejected";

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

  const status: VerificationStatus | undefined =
    rawStatus && ["pending", "approved", "rejected"].includes(rawStatus)
      ? (rawStatus as VerificationStatus)
      : undefined;

  if (rawStatus && !status) {
    return NextResponse.json(
      { error: "Invalid status filter" },
      { status: 400 }
    );
  }

  const filters: SQL[] = [eq(users.role, "doctor")];

  if (status) {
    filters.push(eq(doctorProfiles.verificationStatus, status));
  }

  if (search) {
    const searchValue = `%${search}%`;

    const searchFilter = or(
      like(users.email, searchValue),
      like(users.phone, searchValue),
      like(sql`${doctorProfiles.fullName}`, searchValue),
      like(sql`${doctorProfiles.licenseNumber}`, searchValue)
    );

    if (searchFilter) {
      filters.push(searchFilter);
    }
  }

  const whereClause = and(...filters);
  const offset = (page - 1) * pageSize;

  const doctors = await db
    .select({
      id: users.id,
      email: users.email,
      phone: users.phone,
      role: users.role,
      createdAt: users.createdAt,
      doctorProfile: doctorProfiles,
    })
    .from(users)
    .leftJoin(doctorProfiles, eq(doctorProfiles.userId, users.id))
    .where(whereClause)
    .orderBy(desc(users.createdAt))
    .limit(pageSize)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .leftJoin(doctorProfiles, eq(doctorProfiles.userId, users.id))
    .where(whereClause);

  return NextResponse.json({
    data: doctors,
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

  const payload = doctorCreateSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: payload.error.flatten() },
      { status: 400 }
    );
  }

  const { email, phone, profile } = payload.data;

  const existingUser = await db.query.users.findFirst({
    where: email
      ? eq(users.email, email)
      : eq(users.phone, phone ?? ""),
    columns: { id: true },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }

  const [user] = await db
    .insert(users)
    .values({
      email: email ?? null,
      phone: phone ?? null,
      role: "doctor",
    })
    .returning({
      id: users.id,
      email: users.email,
      phone: users.phone,
    });

  const [doctorProfile] = await db
    .insert(doctorProfiles)
    .values({
      userId: user.id,
      fullName: profile.fullName,
      specialization: profile.specialization,
      licenseNumber: profile.licenseNumber,
      yearsOfExperience: profile.yearsOfExperience ?? null,
      bio: profile.bio ?? null,
      clinicAddress: profile.clinicAddress ?? null,
      clinicGeoLat: profile.clinicGeoLat ?? null,
      clinicGeoLng: profile.clinicGeoLng ?? null,
      consultationFee: profile.consultationFee,
      availability: profile.availability ?? null,
      verificationStatus: profile.verificationStatus ?? "pending",
    })
    .returning();

  return NextResponse.json(
    { data: { ...user, doctorProfile } },
    { status: 201 }
  );
}
