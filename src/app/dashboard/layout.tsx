"use client";

import { useAuth } from "@/shared/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // keep check if token expires or is expired already
  useAuth().checkSession();

  return <>{children}</>;
}
