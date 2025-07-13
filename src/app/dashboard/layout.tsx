"use client";

import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import { useAuthStore } from "@/lib/state/auth.store";
import useAcademic from "@/shared/hooks/use-academic";
import { useAuth } from "@/shared/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // keep check if token expires or is expired already
  useAuth().checkSession();

  const { user } = useAuthStore();
  if (!user) return null;

  useAcademic();

  switch (user.role.toLowerCase()) {
    case "student":
      return <>{children}</>;
    default:
      return <SidebarLayout>{children}</SidebarLayout>;
  }
}
