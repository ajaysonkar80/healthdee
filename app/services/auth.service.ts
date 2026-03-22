// app/services/auth.service.ts

export type AuthUser = {
  id:   string;
  role: "admin" | "doctor" | "patient";
  name?: string;
};

// Returned when login hits an incomplete signup
export type LoginIncomplete = {
  nextStep: "verify_email" | "select_role";
  onboardingToken?: string;
};

type ApiResponse<T> = { data: T; meta?: unknown };

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    if (res.status === 401) throw new Error("UNAUTHORIZED");
    if (res.status === 403) throw new Error("FORBIDDEN");
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export const authService = {

  async login(input: {
    email:    string;
    password: string;
  }): Promise<AuthUser | LoginIncomplete> {
    const res = await fetch("/api/auth/login", {
      method:  "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "email", ...input }),
    });

    const json: ApiResponse<{ user?: AuthUser; nextStep?: string }> =
      await res.json();

    if (!res.ok) throw new Error(json as unknown as string);

    const data = json.data;

    // Incomplete signup — return nextStep signal
    if (data.nextStep === "verify_email" || data.nextStep === "select_role") {
      return { nextStep: data.nextStep } as LoginIncomplete;
    }

    if (!data.user) throw new Error("Login failed");
    return data.user;
  },

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  },

  async refresh(): Promise<AuthUser> {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    return handleResponse<AuthUser>(res);
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 401) return null;
    return handleResponse<AuthUser>(res);
  },
};