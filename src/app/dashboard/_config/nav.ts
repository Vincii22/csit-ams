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
          { title: "Student List", href: "/dashboard/members" },
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
          { title: "Summary", href: "/dashboard/finances" },
          { title: "Income", href: "/dashboard/finances/income" },
          { title: "Expenses", href: "/dashboard/finances/expenses" },
        ],
      },
      {
        title: "Events",
        icon: "calendar",
        href: "/dashboard/events",
      },
    ],
    [
      {
        title: "Library",
        icon: "folder",
        children: [
          { title: "Files", href: "/dashboard/files" },
          { title: "Media", href: "/dashboard/media" },
          { title: "Manual", href: "/dashboard/manual" },
        ],
      },
      {
        title: "Archives",
        icon: "archive",
        href: "/dashboard/archives",
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
