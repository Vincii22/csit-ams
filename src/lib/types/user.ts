import { Courses, Positions, Roles, YearLevels } from "../constants";

export type Role = (typeof Roles)[number];
export type YearLevel = (typeof YearLevels)[number];
export type Course = (typeof Courses)[number];
export type Position = (typeof Positions)[keyof typeof Positions];

type BaseUser = {
  id: number;
  fullName: string;
  email: string;
  password: string; // remove later
  course: Course;
  yearLevel: YearLevel;
  schoolId?: string;
};

type OfficerUser = BaseUser & {
  role: "officer";
  position: Position;
};

type AdminOrStudentUser = BaseUser & {
  role: "admin" | "student";
  position?: never;
};

export type User = OfficerUser | AdminOrStudentUser;
