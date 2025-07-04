import { Role } from "@/lib/types";

export type NavItem = {
  title?: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
};

export function getNavItemsForRole(role: Role) {
  return NAV_ITEMS[role];
}

const sharedNav: NavItem[][] = [
  [
    { title: "Overview", href: "/dashboard", icon: "house" },
    {
      title: "Members",
      icon: "users",
      children: [
        { title: "Student List", href: "/dashboard/members" },
        { title: "Attendance", href: "/dashboard/members/attendance" },
        { title: "Sanctions", href: "/dashboard/members/sanctions" },
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
    { title: "Archive", icon: "archive", href: "/dashboard/archive" },
    {
      title: "Activity Log",
      icon: "activity",
      href: "/dashboard/audit",
    },
  ],
];

export const NAV_ITEMS: Record<Role, NavItem[][]> = {
  admin: [
    [...sharedNav[0]],
    [...sharedNav[1]],
    [
      {
        title: "User Access",
        icon: "shield",
        children: [
          { title: "Manage Roles", href: "/dashboard/access/roles" },
          { title: "Permissions", href: "/dashboard/access/permissions" },
        ],
      },
      {
        title: "Settings",
        icon: "settings",
        href: "/dashboard/settings",
      },
    ],
  ],
  officer: sharedNav,
  student: [],
};
