export enum IconSizes {
  XL = 24,
  LARGE = 22,
  MED = 20,
  SMALL = 18,
  XS = 16,
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

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

export const HTTP_STATUS = {
  400: {
    title: "BAD_REQUEST",
    description: "The server could not understand the request",
  },
  401: {
    title: "UNAUTHORIZED",
    description: "You must be logged in to access this resource",
  },
  403: {
    title: "FORBIDDEN",
    description: "You do not have permission to access this",
  },
  404: {
    title: "NOT_FOUND",
    description: "The requested resource could not be found",
  },
  409: {
    title: "CONFLICT",
    description: "The request conflicts with the current state of the resource",
  },
  422: {
    title: "UNPROCESSABLE_ENTITY",
    description: "Validation failed or missing fields",
  },
  500: {
    title: "INTERNAL_SERVER_ERROR",
    description: "Something went wrong on our end",
  },
  503: {
    title: "SERVICE_UNAVAILABLE",
    description:
      "The service is temporarily unavailable. Please try again later",
  },
} as const;

export type HttpStatusCode = keyof typeof HTTP_STATUS;
