import { Role } from "@/lib/types";

type NavItem = {
  title: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
};

export const NAV_ITEMS: Record<Role, NavItem[]> = {
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Organization",
      icon: "users",
      children: [
        { title: "Officers", href: "/dashboard/officers", icon: "shield" },
        { title: "Students", href: "/dashboard/students", icon: "user" },
      ],
    },
    {
      title: "Academic Year",
      href: "/dashboard/academic",
      icon: "calendar",
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: "file-text",
    },
  ],
  officer: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Members",
      href: "/dashboard/members",
      icon: "users",
    },
    {
      title: "Attendance",
      href: "/dashboard/attendance",
      icon: "calendar-check",
    },
    {
      title: "Sanctions",
      href: "/dashboard/sanctions",
      icon: "alert-triangle",
    },
    {
      title: "Finances",
      href: "/dashboard/finances",
      icon: "dollar-sign",
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: "calendar",
    },
    {
      title: "Files",
      href: "/dashboard/files",
      icon: "folder",
    },
  ],
  student: [
    {
      title: "My Profile",
      href: "/dashboard",
      icon: "user",
    },
    {
      title: "My Attendance",
      href: "/dashboard/attendance",
      icon: "calendar-check",
    },
    {
      title: "Sanctions",
      href: "/dashboard/sanctions",
      icon: "alert-triangle",
    },
    {
      title: "Announcements",
      href: "/dashboard/announcements",
      icon: "megaphone",
    },
  ],
};

export function getNavItemsForRole(role: Role) { }
