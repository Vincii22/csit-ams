export const Semesters = [1, 2] as const;

export const YearLevels = [1, 2, 3, 4] as const;

export const Courses = ["BSIT", "BSCS"] as const;

export const Roles = ["admin", "officer", "student"] as const;

export const Positions = {
  PRESIDENT: "President",
  IVP: "Internal Vice President",
  EVP: "External Vice President",
  SEC_GEN: "Secretary General",
  SEC_ASS: "Assistant Secretary",
  TREASURER: "Treasurer",
  TREASURER_ASS: "Assistant Treasurer",
  AUDITOR: "Auditor",
  BS_MAN: "Business Manager",
  PRO: "Public Relations Officer",
  PIO: "Public Information Officer",
  IT_REP: "IT Representative",
  CS_REP: "CS Representative",
} as const;

export enum IconSizes {
  XL = 24,
  LARGE = 22,
  MED = 20,
  SMALL = 18,
  XS = 16,
}
