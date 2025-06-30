"use server";

import { registerSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signUp(data: z.infer<typeof registerSchema>) {
  const supabase = await createClient();

  const { error, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        role: "student",
      },
    },
  });

  console.log(authData.user?.id);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/");
  redirect("/dashboard");
}
