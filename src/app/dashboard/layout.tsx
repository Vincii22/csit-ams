"use client";

import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import { useAuthStore } from "@/lib/state/auth.store";
import { useAuthSessionCheck } from "@/shared/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthSessionCheck();
  const { user } = useAuthStore();
  if (!user) return null;

  if (user.role === "student") return <div>{children}</div>;

  return <SidebarLayout>{children}</SidebarLayout>;
}
