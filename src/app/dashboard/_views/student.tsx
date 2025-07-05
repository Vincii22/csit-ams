"use client";

import { useAuthStore } from "@/lib/state/auth.store";

export default function StudentView() {
  return (
    <button
      onClick={() => {
        useAuthStore.setState({
          expiresAt: Math.floor(Date.now() / 1000) + 5, // expired
        });
      }}
    >
      Simulate Session Expired
    </button>
  );
}
