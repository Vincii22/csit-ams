import { Course, Position, Role, User, YearLevel } from "../types";

export function normalizeUser(raw: any): User {
  if (raw.role === "ADMIN") {
    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      role: "admin",
    };
  }

  if (!raw.student) {
    throw new Error("User data is missing student information");
  }

  return {
    id: raw.id,
    email: raw.email,
    name: raw.name,
    role: raw.role.toLowerCase() as Role,
    course: raw.student.courseId as Course,
    year: raw.student.year as YearLevel,
    schoolId: raw.student.schoolId,
    position: raw.student.positionId as Position | null,
  };
}
