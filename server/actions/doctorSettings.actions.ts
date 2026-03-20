// server/actions/doctorSettings.actions.ts
"use server";

import { cookies } from "next/headers";
import { verifyAccessToken } from "@/server/utils/jwt";
import { doctorService } from "@/server/services/doctor.service";
import { revalidatePath } from "next/cache";

async function getActorUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) throw new Error("Unauthorized");
  const payload = verifyAccessToken(token);
  return payload.sub as string;
}

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return v ? String(v).trim() : undefined;
}

function num(formData: FormData, key: string) {
  const v = formData.get(key);
  if (!v) return undefined;
  const n = parseInt(String(v), 10);
  return isNaN(n) ? undefined : n;
}

function bool(formData: FormData, key: string) {
  const v = formData.get(key);
  return v === "true" || v === "on";
}

/* ── Personal ── */
export async function updatePersonalDetailsAction(formData: FormData) {
  const userId = await getActorUserId();
  const name = str(formData, "name");
  if (!name) throw new Error("Name is required");
  await doctorService.updateDoctorPersonalDetails(userId, { name });
  revalidatePath("/doctor/settings/personal");
  revalidatePath("/doctor");
}

/* ── Professional ── */
export async function updateProfessionalDetailsAction(formData: FormData) {
  const userId = await getActorUserId();
  await doctorService.updateDoctorProfessionalDetails(userId, {
    fullName:               str(formData, "fullName"),
    specialty:              str(formData, "specialty"),
    degrees:                str(formData, "degrees"),
    languages:              str(formData, "languages"),
    tagline:                str(formData, "tagline"),
    experienceYears:        num(formData, "experienceYears"),
    bio:                    str(formData, "bio"),
    consultationFee:        num(formData, "consultationFee"),
    rmpRegistrationNumber:  str(formData, "rmpRegistrationNumber"),
    rmpStateMedicalCouncil: str(formData, "rmpStateMedicalCouncil"),
  });
  revalidatePath("/doctor/settings/professional");
  revalidatePath("/doctor");
}

/* ── Notification Preferences ── */
export async function updateDoctorPreferencesAction(formData: FormData) {
  const userId = await getActorUserId();
  await doctorService.updateDoctorPreferences(userId, {
    whatsappAlerts:       bool(formData, "whatsappAlerts"),
    smsNotifications:     bool(formData, "smsNotifications"),
    emailNotifications:   bool(formData, "emailNotifications"),
    appointmentReminders: bool(formData, "appointmentReminders"),
  });
  revalidatePath("/doctor/settings/security");
}