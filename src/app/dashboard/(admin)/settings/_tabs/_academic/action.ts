"use server";

import z from "zod";
import { academicYearSchema } from "./components/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAcademicYear({
  academic_year,
}: z.infer<typeof academicYearSchema>) {
  try {
    const initial_year = parseInt(
      academic_year
        .match(/\d{4}\s-/)
        ?.at(0)
        ?.replace("-", "") as string
    );

    const init_date = new Date();
    init_date.setFullYear(initial_year);

    const end_date = new Date();
    end_date.setFullYear(initial_year + 1);

    await prisma.$transaction(async (tx) => {
      const ay = await tx.academicYear.create({
        data: {
          label: academic_year,
          startDate: init_date,
          endDate: end_date,
        },
      });

      await tx.academicYearSemester.create({
        data: {
          academicYearId: ay.id,
          semester: "FIRST_SEMESTER",
        },
      });
    });

    revalidatePath("/dashboard/settings");

    return { success: true, status: 204 };
  } catch (error) {
    return {
      success: false,
      status: 400,
      error: new Error(`${academic_year} is already existing`),
    };
  }
}

export async function updateSemester({
  semester,
}: {
  semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
}) {
  try {
    await prisma.$transaction(async (tx) => {
      const ay = await tx.academicYear.findFirst({
        orderBy: {
          startDate: "desc",
        },
      });

      if (!ay) {
        throw new Error("No active academic year yet");
      }

      await tx.academicYearSemester.create({
        data: {
          academicYearId: ay.id,
          semester,
        },
      });
    });

    return { success: true, status: 204, current_semester: semester };
  } catch (err) {
    const error = err as Error;

    if (error.name) {
      return {
        success: false,
        status: 409,
        error: new Error("Unable to switch semesters"),
      };
    }

    return { success: false, status: 409, error };
  }
}
