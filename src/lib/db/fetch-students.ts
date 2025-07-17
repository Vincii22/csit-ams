import { normalizeUser } from "@/lib/utils/normalize-user";
import prisma from "@/lib/prisma";
import { User } from "../types";

export async function fetchStudents(): Promise<User[]> {
  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
    include: {
      student: true,
    },
  });

  return students.map(normalizeUser);
}
