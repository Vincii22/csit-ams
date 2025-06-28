import { NavItem, Role } from "./types";

export const Roles = ["admin", "officer", "student"] as const;
export const YearLevels = [1, 2, 3, 4] as const;
export const Courses = ["BSIT", "BSCS"] as const;

export enum IconSizes {
  XL = 24,
  LARGE = 22,
  MED = 20,
  SMALL = 18,
  XS = 16,
}

export const NAV_ITEMS: Record<Role, NavItem[]> = {
  admin: [],
  officer: [],
  student: [],
};
