"use server";

import { loginSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { z } from "zod";

// because typescript is saying 'undefined'
type SignInResult =
  | { success: true; user: User; remember: boolean }
  | { success: false; error: { message: string } };

export async function signIn(
  credentials: z.infer<typeof loginSchema>,
): Promise<SignInResult> {
  const supabase = await createClient();

  const { remember, ...authCredentials } = credentials;
  const { data, error } =
    await supabase.auth.signInWithPassword(authCredentials);

  if (error) {
    return { success: false, error: { message: error.message } };
  }

  return {
    success: true,
    user: data.user,
    remember,
  };
}
