import { Role } from "@/lib/types";

export type NavItem = {
  title?: string;
  type?: "item" | "divider";
  href?: string;
  icon?: string;
  children?: NavItem[];
};

export type NavItemGroup = {
  type: "group";
  items: NavItem[];
};

export function getNavItemsForRole(role: Role) {
  return NAV_ITEMS[role];
}

export const NAV_ITEMS: Record<Role, NavItem[][]> = {
  admin: [
    [
      {
        title: "Overview",
        href: "/dashboard",
        icon: "house",
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
  ],

  officer: [
    [
      {
        title: "Overview",
        href: "/dashboard",
        icon: "house",
      },
      {
        title: "Members",
        icon: "users",
        children: [
          { title: "Overview", href: "/dashboard/members" },
          {
            title: "Sections",
            href: "/dashboard/members/sections",
          },
          {
            title: "Attendance",
            href: "/dashboard/members/attendance",
          },
          {
            title: "Sanctions",
            href: "/dashboard/members/sanctions",
          },
        ],
      },
      {
        title: "Finances",
        icon: "dollar-sign",
        children: [
          { title: "Overview", href: "/dashboard/finances" },
          { title: "Collections", href: "/dashboard/finances/collections" },
          { title: "Expenses", href: "/dashboard/finances/expenses" },
          { title: "Requests", href: "/dashboard/finances/requests" },
        ],
      },
      {
        title: "Events",
        icon: "calendar",
        children: [
          { title: "Upcoming", href: "/dashboard/events" },
          { title: "Proposals", href: "/dashboard/events/proposals" },
          { title: "Announcements", href: "/dashboard/events/announcements" },
        ],
      },
    ],
    [
      {
        title: "Resources",
        icon: "folder",
        children: [
          { title: "Org Files", href: "/dashboard/files" },
          { title: "Documentation", href: "/dashboard/docs" },
          { title: "Media", href: "/dashboard/media" },
        ],
      },
      {
        title: "Archives",
        icon: "archive",
        children: [
          {
            title: "Academic Years",
            href: "/dashboard/archives/years",
            icon: "calendar",
          },
          {
            title: "Members",
            href: "/dashboard/archives/members",
            icon: "users",
          },
          {
            title: "Events",
            href: "/dashboard/archives/events",
            icon: "calendar-clock",
          },
          {
            title: "Finances",
            href: "/dashboard/archives/finances",
            icon: "dollar-sign",
          },
          { title: "Logs", href: "/dashboard/archives/logs", icon: "scroll" },
        ],
      },
      {
        title: "Logs",
        href: "/dashboard/logs",
        icon: "scroll",
      },
    ],
  ],
  student: [], // no sidebar
};
