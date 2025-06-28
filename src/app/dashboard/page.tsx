"use client";

import { useAuthStore } from "@/lib/state/auth.store";
import { useAuthSessionCheck } from "@/shared/hooks/use-auth";

import AdminDashboard from "./_admin/view";
import StudentDashboard from "./_student/view";
import OfficerDashboard from "./_officer/view";
import Loader from "@/components/ui/loader";

export default function DashboardPage() {
  const { user } = useAuthStore();

  // check if session has expired on load
  useAuthSessionCheck();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "officer":
      return <OfficerDashboard />;
    case "student":
      return <StudentDashboard />;
  }
}
