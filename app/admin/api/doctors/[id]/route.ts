import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { doctors, users } from "@/db/schema";
import { authorizeAdmin } from "@/lib/auth";
import { doctorUpdateSchema } from "@/lib/validators";

/* -----------------------------------------------------
   GET /admin/api/doctors/:id
----------------------------------------------------- */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { response } = await authorizeAdmin(request);
  if (response) return response;

  const result = await db
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
    .where(and(eq(users.id, id), eq(users.role, "doctor")))
    .limit(1);

  if (!result.length) {
    return NextResponse.json(
      { error: "Doctor not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: result[0] });
}

/* -----------------------------------------------------
   PATCH /admin/api/doctors/:id
----------------------------------------------------- */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { response } = await authorizeAdmin(request);
  if (response) return response;

  const parsed = doctorUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { profile } = parsed.data;

  if (profile) {
    const updates: Partial<typeof doctors.$inferInsert> = {};

    if (profile.specialty !== undefined)
      updates.specialty = profile.specialty;

    if (profile.yearsOfExperience !== undefined)
      updates.experienceYears = profile.yearsOfExperience ?? 0;

    if (profile.verificationStatus !== undefined)
      updates.verificationStatus = profile.verificationStatus;

    if (profile.profileImageUrl !== undefined)
      updates.profileImageUrl = profile.profileImageUrl ?? null;

    if (Object.keys(updates).length) {
      await db
        .update(doctors)
        .set(updates)
        .where(eq(doctors.userId, id));
    }
  }

  return NextResponse.json({ success: true });
}

/* -----------------------------------------------------
   PUT → PATCH
----------------------------------------------------- */
export function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PATCH(request, context);
}

/* -----------------------------------------------------
   DELETE /admin/api/doctors/:id
----------------------------------------------------- */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { response } = await authorizeAdmin(request);
  if (response) return response;

  await db.delete(users).where(eq(users.id, id));

  return NextResponse.json({ success: true });
}
