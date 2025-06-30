"use server";

import { registerSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function signUp(data: z.infer<typeof registerSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        schoolId: data.schoolId,
        course: data.course,
        year: parseInt(data.yearLevel),
        role: "STUDENT",
      },
    },
  });

  if (error) {
    return { success: false, status: 400, msg: error.message };
  }

  return { success: true, status: 204, msg: "Waiting for email confirmation" };
}
