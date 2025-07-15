"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getSettingsData() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const res = await prisma.academicYearSemester.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      academicYear: true,
    },
  });

  console.log(res);

  const autoSet = await prisma.autoSet.findFirst({
    where: {
      adminId: data.user?.id as string,
    },
  });

  return {
    success: true,
    status: 200,
    startDate: res?.academicYear.startDate,
    endDate: res?.academicYear.endDate,
    academicYear: res?.academicYear.label,
    semester: res?.semester,
    autoSet: autoSet?.autoSet,
  };
}

export async function updateAutoSet(autoSet: boolean) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) {
      throw new Error("Unauthorized access");
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: data.user.id,
        },
      });

      if (user?.role !== "ADMIN") {
        throw new Error("Forbidden access to autoSet");
      }

      await tx.autoSet.upsert({
        where: {
          adminId: data.user.id,
        },
        create: {
          adminId: data.user.id,
          autoSet: true,
        },
        update: {
          autoSet: autoSet,
        },
        include: {
          admin: true,
        },
      });
    });

    return { success: true, status: 204, autoSet };
  } catch (error) {
    return { success: false, status: 403, error: error as Error };
  }
}
