"use client";

import { useAuthStore } from "@/lib/state/auth.store";

import AdminView from "./_views/admin";
import OfficerView from "./_views/officer";
import StudentView from "./_views/student";
import Loader from "@/components/ui/loader";

export default function DashboardPage() {
  const { user } = useAuthStore();
  if (!user) return null;

  switch (user.role.toLowerCase()) {
    case "admin":
      return <AdminView />;
    case "officer":
      return <OfficerView />;
    case "student":
      return <StudentView />;
    default:
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      );
  }
}
