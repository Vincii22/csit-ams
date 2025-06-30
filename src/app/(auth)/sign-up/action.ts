"use server";

import { registerSchema } from "@/lib/schemas/auth.schema";
import { supabase } from "@/lib/supabase/client";
import { z } from "zod";

export async function signUp(data: z.infer<typeof registerSchema>) {
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
  }
}
