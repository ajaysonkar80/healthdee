import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

import { PATCH as confirmRoute } from "@/app/api/appointments/[id]/confirm/route";

import { verifyAccessToken } from "@/server/utils/jwt";
import { appointmentRepo } from "@/server/repositories/appointment.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { patientRepo } from "@/server/repositories/patient.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

import { UserRole } from "@/server/constants/user-role";
import { PATCH as cancelRoute } 
from "@/app/api/appointments/[id]/cancel/route";
import { PATCH as rescheduleRoute }
from "@/app/api/appointments/[id]/reschedule/route";
import { POST as createRoute }
from "@/app/api/appointments/route";
/* -----------------------------------------------------
   Mocks
----------------------------------------------------- */

vi.mock("@/server/utils/jwt", () => ({
  verifyAccessToken: vi.fn(),
}));
 
vi.mock("@/server/repositories/appointment.repo", () => ({
  appointmentRepo: {
    getAppointmentById: vi.fn(),
    updateAppointmentStatus: vi.fn(),
  },
}));

vi.mock("@/server/repositories/user.repo", () => ({
  userRepo: {
    getUserById: vi.fn(),
  },
}));

vi.mock("@/server/repositories/doctor.repo", () => ({
  doctorRepo: {
    getDoctorByUserId: vi.fn(),
  },
}));

vi.mock("@/server/repositories/patient.repo", () => ({
  patientRepo: {
    getPatientByUserId: vi.fn(),
  },
}));

vi.mock("@/server/repositories/audit.repo", () => ({
  auditRepo: {
    create: vi.fn(),
  },
}));

vi.mock("@/server/repositories/appointment.repo", () => ({
  appointmentRepo: {
    getAppointmentById: vi.fn(),
    createAppointment: vi.fn(),
    updateAppointmentStatus: vi.fn(),
    updateScheduledAt: vi.fn(),
    existsOverlappingAppointment: vi.fn(),
  },
}));

vi.mock("@/server/repositories/doctor.repo", () => ({
  doctorRepo: {
    getDoctorById: vi.fn(),
    getDoctorByUserId: vi.fn(),
    getByDoctorAndDay: vi.fn(),
  },
}));

vi.mock("@/server/repositories/patient.repo", () => ({
  patientRepo: {
    getPatientByUserId: vi.fn(),
  },
}));

vi.mock("@/server/repositories/user.repo", () => ({
  userRepo: {
    getUserById: vi.fn(),
  },
}));

vi.mock("@/server/repositories/audit.repo", () => ({
  auditRepo: {
    create: vi.fn(),
  },
}));

/* -----------------------------------------------------
   Helpers
----------------------------------------------------- */

function createRequest(token?: string) {
  return new NextRequest("http://localhost/api", {
    method: "PATCH",
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

/* =====================================================
   TESTS
===================================================== */

describe("Appointment Confirm API", () => {
  const appointmentId = "appt1";

  /* -------------------------------------------------- */
  it("should confirm PENDING appointment (doctor)", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "doctorUser1",
      role: "doctor",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "doctorUser1",
      role: UserRole.doctor,
    });

    (doctorRepo.getDoctorByUserId as any).mockResolvedValue({
      id: "doctor1",
      userId: "doctorUser1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor1",
      patientId: "patient1",
      status: "PENDING",
      scheduledAt: new Date(),
    });

    (appointmentRepo.updateAppointmentStatus as any).mockResolvedValue({
      id: appointmentId,
      status: "CONFIRMED",
    });

    const req = createRequest("valid-token");
    const res = await confirmRoute(req, createContext(appointmentId));

    expect(res.status).toBe(200);

    const body = await res.json();

    expect(body.success).toBe(true);
    expect(body.data.currentStatus).toBe("CONFIRMED");

    expect(auditRepo.create).toHaveBeenCalledTimes(1);
  });

  /* -------------------------------------------------- */
  it("should reject patient trying to confirm", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "patientUser1",
      role: "patient",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "patientUser1",
      role: UserRole.patient,
    });

    (patientRepo.getPatientByUserId as any).mockResolvedValue({
      id: "patient1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor1",
      patientId: "patient1",
      status: "PENDING",
      scheduledAt: new Date(),
    });

    const req = createRequest("valid-token");
    const res = await confirmRoute(req, createContext(appointmentId));

    expect(res.status).toBe(403);

    const body = await res.json();
    expect(body.error.message).toMatch(/Patients cannot confirm/);
  });

  /* -------------------------------------------------- */
  it("should reject doctor confirming another doctor's appointment", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "doctorUser1",
      role: "doctor",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "doctorUser1",
      role: UserRole.doctor,
    });

    (doctorRepo.getDoctorByUserId as any).mockResolvedValue({
      id: "doctor1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor2",
      patientId: "patient1",
      status: "PENDING",
      scheduledAt: new Date(),
    });

    const req = createRequest("valid-token");
    const res = await confirmRoute(req, createContext(appointmentId));

    expect(res.status).toBe(403);

    const body = await res.json();
    expect(body.error.message).toMatch(/Access denied/);
  });

  /* -------------------------------------------------- */
  it("should reject invalid transition", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "doctorUser1",
      role: "doctor",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "doctorUser1",
      role: UserRole.doctor,
    });

    (doctorRepo.getDoctorByUserId as any).mockResolvedValue({
      id: "doctor1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor1",
      patientId: "patient1",
      status: "COMPLETED",
      scheduledAt: new Date(),
    });

    const req = createRequest("valid-token");
    const res = await confirmRoute(req, createContext(appointmentId));

    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error.message).toMatch(/Invalid appointment transition/);
  });

  /* -------------------------------------------------- */
  it("should return 401 if no token", async () => {
    const req = createRequest(); // no token
    const res = await confirmRoute(req, createContext(appointmentId));

    expect(res.status).toBe(401);
  });

  /* -------------------------------------------------- */
  it("should handle appointment not found", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "doctorUser1",
      role: "doctor",
    });

    (appointmentRepo.getAppointmentById as any).mockRejectedValue(
      new Error("Appointment not found")
    );

    const req = createRequest("valid-token");
    const res = await confirmRoute(req, createContext(appointmentId));

    expect(res.status).toBe(500);
  });
});

describe("Appointment Cancel API", () => {
  const appointmentId = "appt1";

  it("should allow patient to cancel own PENDING appointment", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "patientUser1",
      role: "patient",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "patientUser1",
      role: UserRole.patient,
    });

    (patientRepo.getPatientByUserId as any).mockResolvedValue({
      id: "patient1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor1",
      patientId: "patient1",
      status: "PENDING",
      scheduledAt: new Date(),
    });

    (appointmentRepo.updateAppointmentStatus as any).mockResolvedValue({
      id: appointmentId,
      status: "CANCELLED",
    });

    const req = createRequest("valid-token");
    const res = await cancelRoute(req, createContext(appointmentId));

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data.currentStatus).toBe("CANCELLED");
  });

  it("should reject cancelling COMPLETED appointment", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "patientUser1",
      role: "patient",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "patientUser1",
      role: UserRole.patient,
    });

    (patientRepo.getPatientByUserId as any).mockResolvedValue({
      id: "patient1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor1",
      patientId: "patient1",
      status: "COMPLETED",
      scheduledAt: new Date(),
    });

    const req = createRequest("valid-token");
    const res = await cancelRoute(req, createContext(appointmentId));

    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error.message).toMatch(/Invalid appointment transition/);
  });
});



describe("Create Appointment API", () => {
  const futureDate = new Date(Date.now() + 60 * 60 * 1000);

  it("should create appointment successfully", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "patientUser1",
      role: "patient",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "patientUser1",
      role: UserRole.patient,
      status: "active",
    });

    (patientRepo.getPatientByUserId as any).mockResolvedValue({
      id: "patient1",
    });

    (doctorRepo.getDoctorById as any).mockResolvedValue({
      id: "doctor1",
      userId: "doctorUser1",
      verificationStatus: "verified",
    });

    (doctorRepo.getByDoctorAndDay as any).mockResolvedValue({
      isActive: true,
      startTime: "00:00",
      endTime: "23:59",
    });

    (appointmentRepo.existsOverlappingAppointment as any)
      .mockResolvedValue(false);

    (appointmentRepo.createAppointment as any)
      .mockResolvedValue({ id: "appt1" });

    const req = new NextRequest("http://localhost/api", {
      method: "POST",
      headers: { Authorization: "Bearer valid-token" },
    });

    (req as any).json = async () => ({
      doctorId: "doctor1",
      scheduledAt: futureDate.toISOString(),
    });

    const res = await createRoute(req);

    expect(res.status).toBe(200);
  });
});

describe("Appointment Reschedule API", () => {
  const appointmentId = "appt1";
  const futureDate = new Date(Date.now() + 60 * 60 * 1000);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reschedule PENDING appointment", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "patientUser1",
      role: "patient",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "patientUser1",
      role: UserRole.patient,
    });

    (patientRepo.getPatientByUserId as any).mockResolvedValue({
      id: "patient1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor1",
      patientId: "patient1",
      status: "PENDING",
      scheduledAt: new Date(Date.now() + 120000),
    });

    (appointmentRepo.existsOverlappingAppointment as any).mockResolvedValue(
      false
    );

    (appointmentRepo.updateScheduledAt as any).mockResolvedValue({
      id: appointmentId,
      scheduledAt: futureDate,
    });

    const req = new NextRequest("http://localhost/api/appointments", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer valid-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scheduledAt: futureDate.toISOString(),
      }),
    });

    const res = await rescheduleRoute(req, createContext(appointmentId));

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data.id).toBe(appointmentId);
  });

  it("should reject rescheduling non-mutable appointment", async () => {
    (verifyAccessToken as any).mockReturnValue({
      sub: "patientUser1",
      role: "patient",
    });

    (userRepo.getUserById as any).mockResolvedValue({
      id: "patientUser1",
      role: UserRole.patient,
    });

    (patientRepo.getPatientByUserId as any).mockResolvedValue({
      id: "patient1",
    });

    (appointmentRepo.getAppointmentById as any).mockResolvedValue({
      id: appointmentId,
      doctorId: "doctor1",
      patientId: "patient1",
      status: "COMPLETED", // guaranteed immutable
      scheduledAt: new Date(),
    });

    const req = new NextRequest("http://localhost/api/appointments", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer valid-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scheduledAt: futureDate.toISOString(),
      }),
    });

    const res = await rescheduleRoute(req, createContext(appointmentId));

    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error.message).toMatch(/pending.*modified/i);
  });
});