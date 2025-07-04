import { Courses, Positions, Roles, YearLevels } from "../constants";

export type Role = (typeof Roles)[number];
export type YearLevel = (typeof YearLevels)[number];
export type Course = (typeof Courses)[number];
export type Position = (typeof Positions)[keyof typeof Positions];

export type BaseUser = {
  id: string;
  name: string;
  email: string;
};

export type Student = BaseUser & {
  schoolId: string;
  course: Course;
  year: YearLevel;
  position?: Position | null;
  role: "student" | "officer";
};

export type Admin = BaseUser & {
  role: "admin";
};

export type User = Student | Admin;

export type UserMetadata = {
  full_name: string;
  schoolId: string;
  year: number;
  role: Role;
  course: Course;
};
