"use client";

import { useAuthStore } from "@/lib/state/auth.store";

export default function StudentDashboard() {
  return (
    <button
      onClick={() => {
        useAuthStore.setState({
          expiresAt: Math.floor(Date.now() / 1000) + 10, // expired
        });
      }}
    >
      Simulate Session Expired
    </button>
  );
}
