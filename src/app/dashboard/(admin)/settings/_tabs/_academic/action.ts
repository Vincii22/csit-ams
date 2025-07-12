"use server";

import z from "zod";
import { academicYearSchema } from "./form";
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
    return { success: false, status: 400, error: error as Error };
  }
}
