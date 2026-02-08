export const UserStatus = {
  active: "active",
  deactivated: "deactivated",
  deleted: "deleted",
} as const;

export type UserStatusValue =
  typeof UserStatus[keyof typeof UserStatus];
