"use server";

import { fetchUser } from "@/lib/db/fetch-user";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function signUp(data: z.infer<typeof registerSchema>) {
  const supabase = await createClient();
  const user = await fetchUser(data.email);

  if (user) {
    return {
      success: false,
      error: { email: { message: "Duplicated email entry" } },
    };
  }

  // create 'gate pass' to dashboard initial login
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
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
    message: "Waiting for email confirmation",
    email: data.email,
  };
}
