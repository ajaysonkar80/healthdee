"use client";
import * as Sentry from "@sentry/nextjs";

export default function TestPage() {
  return (
    <button
      onClick={() => {
        Sentry.captureException(new Error("Sentry test error"));
      }}
    >
      Test Sentry
    </button>
  );
}