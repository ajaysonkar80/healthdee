import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { doctorProfiles, users } from "@/db/schema";
import { authorizeAdmin } from "@/lib/auth";
import { doctorUpdateSchema } from "@/lib/validators";
import { and, eq } from "drizzle-orm";

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function getParams(context: RouteContext) {
  return context.params;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { response } = await authorizeAdmin(request);

  if (response) {
    return response;
  }

  const { id } = await getParams(context);
  const doctor = await db.query.users.findFirst({
    where: and(eq(users.id, id), eq(users.role, "doctor")),
    columns: { id: true, email: true, phone: true, role: true, createdAt: true },
    with: { doctorProfile: true },
  });

  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  return NextResponse.json({ data: doctor });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { response } = await authorizeAdmin(request);

  if (response) {
    return response;
  }

  const payload = doctorUpdateSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const { email, phone, profile } = payload.data;

  const { id } = await getParams(context);
  const doctor = await db.query.users.findFirst({
    where: and(eq(users.id, id), eq(users.role, "doctor")),
    columns: { id: true },
  });

  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  if (email !== undefined || phone !== undefined) {
    const userUpdates: { email?: string | null; phone?: string | null } = {};

    if (email !== undefined) {
      userUpdates.email = email ?? null;
    }

    if (phone !== undefined) {
      userUpdates.phone = phone ?? null;
    }

    await db
      .update(users)
      .set(userUpdates)
      .where(eq(users.id, id));
  }

  if (profile) {
    const profileUpdates: Partial<typeof doctorProfiles.$inferInsert> = {};

    if (profile.fullName !== undefined) {
      profileUpdates.fullName = profile.fullName;
    }

    if (profile.specialization !== undefined) {
      profileUpdates.specialization = profile.specialization;
    }

    if (profile.licenseNumber !== undefined) {
      profileUpdates.licenseNumber = profile.licenseNumber;
    }

    if (profile.yearsOfExperience !== undefined) {
      profileUpdates.yearsOfExperience = profile.yearsOfExperience ?? null;
    }

    if (profile.bio !== undefined) {
      profileUpdates.bio = profile.bio ?? null;
    }

    if (profile.clinicAddress !== undefined) {
      profileUpdates.clinicAddress = profile.clinicAddress ?? null;
    }

    if (profile.clinicGeoLat !== undefined) {
      profileUpdates.clinicGeoLat = profile.clinicGeoLat ?? null;
    }

    if (profile.clinicGeoLng !== undefined) {
      profileUpdates.clinicGeoLng = profile.clinicGeoLng ?? null;
    }

    if (profile.consultationFee !== undefined) {
      profileUpdates.consultationFee = profile.consultationFee;
    }

    if (profile.availability !== undefined) {
      profileUpdates.availability = profile.availability ?? null;
    }

    if (profile.verificationStatus !== undefined) {
      profileUpdates.verificationStatus = profile.verificationStatus;
    }

    if (Object.keys(profileUpdates).length === 0) {
      const updatedDoctor = await db.query.users.findFirst({
        where: eq(users.id, id),
        columns: { id: true, email: true, phone: true, role: true, createdAt: true },
        with: { doctorProfile: true },
      });

      return NextResponse.json({ data: updatedDoctor });
    }

    await db
      .update(doctorProfiles)
      .set(profileUpdates)
      .where(eq(doctorProfiles.userId, id));
  }

  const updatedDoctor = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: { id: true, email: true, phone: true, role: true, createdAt: true },
    with: { doctorProfile: true },
  });

  return NextResponse.json({ data: updatedDoctor });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return PATCH(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { response } = await authorizeAdmin(request);

  if (response) {
    return response;
  }

  const { id } = await getParams(context);
  const doctor = await db.query.users.findFirst({
    where: and(eq(users.id, id), eq(users.role, "doctor")),
    columns: { id: true },
  });

  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  await db.delete(users).where(eq(users.id, id));

  return NextResponse.json({ success: true });
}
