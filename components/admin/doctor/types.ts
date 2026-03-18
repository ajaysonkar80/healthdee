// components/admin/doctor/types.ts
// Shared type for the admin doctors list, derived from
// the listDoctors repo query shape.

export type DoctorRow = {
  id: string;
  publicId: string;
  fullName: string | null;
  specialty: string;
  experienceYears: number | null;
  consultationFee: number | null;
  rating: number;
  profileImageUrl: string | null;
  rmpRegistrationNumber: string;
  verificationStatus: "pending" | "verified" | "rejected";
  isActive: boolean | null;
  createdAt: Date | null;
  userId: string;
  userStatus: string;
};

export type DoctorStats = {
  total: number;
  verified: number;
  pending: number;
  active: number;
};