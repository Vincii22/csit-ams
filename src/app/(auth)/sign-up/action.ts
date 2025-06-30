"use server";

import { registerSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signUp(data: z.infer<typeof registerSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        role: "student",
      },
    },
  });

  if (error) {
    redirect("/error");
  }

  const redirectedFrom = "sign-up";
  const url = `/sign-in?redirectedFrom=${encodeURIComponent(redirectedFrom)}`;

  revalidatePath("/");
  redirect(url);
}
