"use server";

import { fetchUser } from "@/lib/db/fetch-user";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function addStudentUser(formData: z.infer<typeof registerSchema>) {
  try {
    const supabase = await createClient();

    const exists = await fetchUser(formData.email);

    if (exists) {
      throw new Error("Email already exists");
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: formData.email,
      password: formData.password,
      email_confirm: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    const course = await prisma.course.findUnique({
      where: { abbreviation: formData.course },
    });

    if (!course) {
      throw new Error("Course does not exists");
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email: data.user?.email as string },
        update: { verifiedAt: new Date() },
        create: {
          id: data.user?.id as string,
          email: data.user?.email as string,
          name: formData.name,
          role: "STUDENT",
          verifiedAt: new Date(),
        },
      });

      await tx.student.upsert({
        where: { id: user.id },
        update: {
          schoolId: formData.schoolId,
          year: parseInt(formData.yearLevel),
          courseId: course!.id,
        },
        create: {
          id: user.id,
          schoolId: formData.schoolId,
          year: parseInt(formData.yearLevel),
          courseId: course!.id,
          positionId: null,
        },
      });
    });

    revalidatePath("/dashboard/students");

    return {
      success: true,
      status: 204,
      message: "New student user has been created",
    };
  } catch (error) {
    return { success: false, status: 400, error: error as Error };
  }
}
