import { vi } from "vitest";

export const authServiceMock = {
  login: vi.fn(),
  logout: vi.fn(),
  me: vi.fn(),
  register: vi.fn(),
  refresh: vi.fn(),
  requestOtp: vi.fn(),
  verifyOtp: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
};

vi.mock("@/server/services/auth.service", () => ({
  authService: authServiceMock,
}));