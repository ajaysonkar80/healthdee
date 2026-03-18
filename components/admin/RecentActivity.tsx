// components/admin/RecentActivity.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import type { AuditLogEntry } from "@/server/repositories/audit.repo";

/* -------------------------------------------------------
   Action → display config
   Add new actions here as the app grows.
------------------------------------------------------- */
type ActionConfig = {
  icon: string;
  label: string;
  describe: (entry: AuditLogEntry) => string;
};

const ACTION_MAP: Record<string, ActionConfig> = {
  DOCTOR_PROFILE_CREATED: {
    icon: "➕",
    label: "Doctor Registered",
    describe: (e) =>
      `New doctor profile created by ${e.actorName ?? "a user"}`,
  },
  DOCTOR_PROFILE_UPDATED: {
    icon: "✏️",
    label: "Profile Updated",
    describe: (e) =>
      `Doctor profile updated by ${e.actorName ?? "a user"}`,
  },
  DOCTOR_VERIFIED: {
    icon: "✅",
    label: "Doctor Verified",
    describe: (e) =>
      `Doctor successfully verified by ${e.actorName ?? "admin"}`,
  },
  DOCTOR_REJECTED: {
    icon: "❌",
    label: "Verification Rejected",
    describe: (e) =>
      `Doctor verification rejected by ${e.actorName ?? "admin"}`,
  },
  DOCTOR_ACTIVATED: {
    icon: "🟢",
    label: "Doctor Activated",
    describe: (e) =>
      `Doctor profile activated by ${e.actorName ?? "admin"}`,
  },
  DOCTOR_DEACTIVATED: {
    icon: "🔴",
    label: "Doctor Deactivated",
    describe: (e) =>
      `Doctor profile deactivated by ${e.actorName ?? "admin"}`,
  },
  APPOINTMENT_CONFIRMED: {
    icon: "📅",
    label: "Appointment Confirmed",
    describe: () => "An appointment was confirmed",
  },
  APPOINTMENT_CANCELLED: {
    icon: "🚫",
    label: "Appointment Cancelled",
    describe: () => "An appointment was cancelled",
  },
  APPOINTMENT_COMPLETED: {
    icon: "🏁",
    label: "Appointment Completed",
    describe: () => "An appointment was marked complete",
  },
};

// Fallback for unmapped actions
function getFallback(action: string): ActionConfig {
  return {
    icon: "📋",
    label: action
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    describe: (e) => `Action by ${e.actorName ?? "system"}`,
  };
}

/* -------------------------------------------------------
   Relative time helper — no external dependency
------------------------------------------------------- */
function relativeTime(date: Date | null): string {
  if (!date) return "—";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/* -------------------------------------------------------
   Component
------------------------------------------------------- */
const INITIAL_VISIBLE = 5;
const LOAD_MORE_STEP = 5;

interface RecentActivityListProps {
  /** Pass up to 20 entries from the server; client paginates locally */
  entries: AuditLogEntry[];
}

export default function RecentActivityList({
  entries,
}: RecentActivityListProps) {
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const shown = entries.slice(0, visible);
  const hasMore = visible < entries.length;

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-muted-foreground">
            No activity recorded yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="link" className="text-pink-500" asChild>
          <a href="/admin/doctors-verification">View All</a>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {shown.map((entry) => {
          const config = ACTION_MAP[entry.action] ?? getFallback(entry.action);
          return (
            <div
              key={entry.id}
              className="flex items-start justify-between border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-pink-50 text-lg">
                  {config.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-medium">{config.label}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {config.describe(entry)}
                  </p>
                </div>
              </div>

              <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                {relativeTime(entry.createdAt)}
              </span>
            </div>
          );
        })}

        {hasMore && (
          <Button
            variant="ghost"
            className="w-full text-sm text-muted-foreground"
            onClick={() => setVisible((v) => v + LOAD_MORE_STEP)}
          >
            Load more activities
          </Button>
        )}
      </CardContent>
    </Card>
  );
}