import { Courses, Roles, YearLevels } from "../constants";

export type Role = (typeof Roles)[number];
export type YearLevel = (typeof YearLevels)[number];
export type Course = (typeof Courses)[number];

export type User = {
  id: number;
  fullName: string;
  email: string;
  password: string; // remove later
  role: Role;
  course: Course;
  yearLevel: YearLevel;
  schoolId?: string;
};
