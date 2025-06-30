"use server";

import { loginSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signIn(credentials: z.infer<typeof loginSchema>) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { success: false, status: 400, error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
