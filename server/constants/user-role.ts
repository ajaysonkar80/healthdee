export const UserRole = {
  patient: "patient",
  doctor: "doctor",
  admin: "admin",
} as const;

export type UserRoleValue =
  typeof UserRole[keyof typeof UserRole];
