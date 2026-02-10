import "next/server";

declare module "next/server" {
  interface NextRequest {
    auth?: {
      userId: string;
      role: "admin" | "doctor" | "patient";
    };
  }
}
