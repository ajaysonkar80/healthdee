// app/doctor/settings/page.tsx
import { redirect } from "next/navigation";

export default function DoctorSettingsPage() {
  redirect("/doctor/settings/personal");
}