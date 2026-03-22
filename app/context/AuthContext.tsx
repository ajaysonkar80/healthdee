// app/context/AuthContext.tsx
"use client";

import type { ReactNode }                from "react";
import { createContext, useContext, useState, use } from "react";
import { useRouter }                     from "next/navigation";
import { authService }                   from "@/app/services/auth.service";
import type { AuthUser }                 from "@/app/services/auth.service";

type AuthContextType = {
  user:           AuthUser | null;
  loading:        boolean;
  login:          (email: string, password: string) => Promise<void>;
  logout:         () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fetched once at module level — shared across the whole app, no waterfall
const userPromise = authService.getCurrentUser().catch(() => null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // `use()` suspends until the promise resolves — no useEffect, no loading flash
  const initialUser         = use(userPromise);
  const [user, setUser]     = useState<AuthUser | null>(initialUser);
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const result = await authService.login({ email, password });

      if ("nextStep" in result) {
        if (result.nextStep === "verify_email") router.push("/verify-email");
        else                                    router.push("/select-role");
        return;
      }

      setUser(result);

      if      (result.role === "admin")  router.push("/admin");
      else if (result.role === "doctor") router.push("/doctor");
      else                               router.push("/patient");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await authService.logout();
    setUser(null);
    router.push("/login");
  }

  async function refreshSession() {
    try {
      const current = await authService.getCurrentUser();
      setUser(current);
    } catch {
      setUser(null);
      router.push("/login");
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}