"use server";

import prisma from "@/lib/prisma";

export async function getCurrentAcademicYear() {
  const res = await prisma.academicYearSemester.findFirst({
    orderBy: {
      academicYear: {
        startDate: "desc",
      },
    },
    include: {
      academicYear: true,
    },
  });

  return {
    startDate: res?.academicYear.startDate,
    endDate: res?.academicYear.endDate,
    academicYear: res?.academicYear.label,
    semester: res?.semester,
  };
}
