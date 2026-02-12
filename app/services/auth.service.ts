/* ======================================================
   Types
====================================================== */

export type AuthUser = {
  id: string;
  role: "admin" | "doctor" | "patient";
};

type ApiResponse<T> = {
  data: T;
  meta?: unknown;
};

/* ======================================================
   Helpers
====================================================== */

async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    if (response.status === 403) {
      throw new Error("FORBIDDEN");
    }

    const errorText = await response.text();
    throw new Error(errorText || "Request failed");
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
}

/* ======================================================
   Auth Service
====================================================== */

export const authService = {
  /* --------------------------------------------------
   Login
--------------------------------------------------- */
async login(input: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "email",
      email: input.email,
      password: input.password,
    }),
  });

  return handleResponse<AuthUser>(response);
},


  /* --------------------------------------------------
     Logout
  --------------------------------------------------- */
  async logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },

  
  /* --------------------------------------------------
   Refresh Token
--------------------------------------------------- */
  /* --------------------------------------------------
   Refresh Token
--------------------------------------------------- */
async refresh(): Promise<AuthUser> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  return handleResponse<AuthUser>(response);
},



  /* --------------------------------------------------
     Get Current Authenticated User
     (Requires backend endpoint like /api/auth/me)
  --------------------------------------------------- */
  async getCurrentUser(): Promise<AuthUser | null> {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return null;
    }

    return handleResponse<AuthUser>(response);
  },
};
