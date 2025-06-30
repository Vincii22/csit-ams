"use client";

import { useAuthStore } from "@/lib/state/auth.store";
import { useAuthSessionCheck } from "@/shared/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // check if session is valid
  useAuthSessionCheck();

  const { user } = useAuthStore();
  if (!user) return null;

  return <>{children}</>;
}
