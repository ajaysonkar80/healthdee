"use client";

import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";

/* ======================================================
   Types (aligned with adminService.getMetrics)
====================================================== */

type AdminMetrics = {
  users: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
    doctors: number;
    patients: number;
  };
  doctors: {
    total: number;
    verified: number;
    rejected: number;
    pending: number;
  };
};

/* ======================================================
   Component
====================================================== */

export default function StatsGrid() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("/api/admin/metrics", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to load admin metrics");
        }

        const json = await res.json();
        setMetrics(json.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Doctors"
          value="—"
          icon={<span>🩺</span>}
        />
        <StatsCard
          title="Pending Verifications"
          value="—"
          icon={<span>📄</span>}
        />
        <StatsCard
          title="Total Users"
          value="—"
          icon={<span>👥</span>}
        />
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (error || !metrics) {
    return (
      <div className="text-sm text-red-600">
        Failed to load metrics
      </div>
    );
  }

  /* ---------------- Success ---------------- */
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatsCard
        title="Total Doctors"
        value={metrics.doctors.total.toLocaleString()}
        footerText={`${metrics.doctors.verified} verified`}
        footerColor="text-green-600"
        icon={<span>🩺</span>}
      />

      <StatsCard
        title="Pending Verifications"
        value={metrics.doctors.pending.toLocaleString()}
        footerText="Requires review"
        footerColor="text-orange-600"
        icon={<span>📄</span>}
      />

      <StatsCard
        title="Total Users"
        value={metrics.users.total.toLocaleString()}
        footerText={`${metrics.users.active} active`}
        footerColor="text-blue-600"
        icon={<span>👥</span>}
      />
    </div>
  );
}
