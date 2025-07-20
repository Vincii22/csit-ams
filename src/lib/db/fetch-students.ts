"use server";

import { normalizeUser } from "@/lib/utils/normalize-user";
import prisma from "@/lib/prisma";
import { User } from "../types";

export async function fetchStudents(): Promise<User[]> {
  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
    orderBy: {
      verifiedAt: "desc",
    },
    include: {
      student: {
        include: {
          course: true,
          position: true,
        },
      },
    },
  });

  return students.map(normalizeUser);
}
