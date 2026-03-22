// components/auth/EmailLoginStep.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function EmailLoginStep() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail)  { setError("Please enter your email address."); return; }
    if (!password)      { setError("Please enter your password."); return; }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/email/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error ?? "Invalid email or password.");
        return;
      }

      const user = json.data?.user;
      if (!user) {
        setError("Login failed. Please try again.");
        return;
      }

      if (user.role === "admin")       router.push("/admin");
      else if (user.role === "doctor") router.push("/doctor");
      else                             router.push("/patient");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm
                     focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500
                     transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm
                       focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500
                       transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Forgot password */}
      <div className="text-right">
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-xs font-medium text-pink-600 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button onClick={handleLogin} className="w-full" disabled={loading}>
        {loading ? "Logging in…" : "Login with Email"}
      </Button>

      <p className="text-center text-xs text-gray-400">
        Use the email address registered with your account.
      </p>
    </div>
  );
}