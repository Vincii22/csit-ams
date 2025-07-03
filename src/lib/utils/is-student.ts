import { Student, User } from "../types";

export function isStudent(user: User): user is Student {
  return user.role === "student" || user.role === "officer";
}
