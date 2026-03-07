"use client";

import type {
  ReactNode} from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/app/services/auth.service";
import { authService } from "@/app/services/auth.service";

/* ======================================================
   Types
====================================================== */

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

/* ======================================================
   Context
====================================================== */

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/* ======================================================
   Provider
====================================================== */

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* --------------------------------------------------
     Initialize session on mount
  --------------------------------------------------- */
  useEffect(() => {
    async function init() {
      try {
        const currentUser =
          await authService.getCurrentUser();

        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  /* --------------------------------------------------
     Login
  --------------------------------------------------- */
  async function login(email: string, password: string) {
    setLoading(true);

    try {
      const loggedInUser = await authService.login({
        email,
        password,
      });

      setUser(loggedInUser);

      // Role-based redirect
      if (loggedInUser.role === "admin") {
        router.push("/admin");
      } else if (loggedInUser.role === "doctor") {
        router.push("/doctor");
      } else {
        router.push("/patient");
      }
    } finally {
      setLoading(false);
    }
  }

  /* --------------------------------------------------
     Logout
  --------------------------------------------------- */
  async function logout() {
    await authService.logout();
    setUser(null);
    router.push("/login");
  }

  /* --------------------------------------------------
     Refresh session
  --------------------------------------------------- */
  async function refreshSession() {
    try {
      await authService.refresh();
      const refreshedUser =
        await authService.getCurrentUser();
      setUser(refreshedUser);
    } catch {
      setUser(null);
      router.push("/login");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ======================================================
   Hook
====================================================== */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}
