"use client";

import { useAuthStore } from "@/lib/state/auth.store";

import AdminDashboard from "./_admin/view";
import StudentDashboard from "./_student/view";
import OfficerDashboard from "./_officer/view";
import Loader from "@/components/ui/loader";

export default function DashboardPage() {
  const { user } = useAuthStore();
  if (!user) return null;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "officer":
      return <OfficerDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      );
  }
}
