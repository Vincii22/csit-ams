"use server";

import { registerSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

type SignUpResult =
  | { success: true }
  | { success: false; error: { message: string } };

export async function signUp(
  data: z.infer<typeof registerSchema>,
): Promise<SignUpResult> {
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
    return { success: false, error: { message: error.message } };
  }

  return {
    success: true,
  };
}
