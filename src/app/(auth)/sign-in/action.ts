"use server";

import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { User } from "@/lib/types";
import { normalizeUser } from "@/lib/utils/normalize-user";
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

  if (!data.user.email_confirmed_at) {
    return { success: false, error: { message: "Please verify your email" } };
  }

  const raw = await prisma.user.findUnique({
    where: { email: data.user.email },
    include: {
      student: true,
    },
  });

  // if user is not found
  if (!raw) {
    return { success: false, error: { message: "Invalid credentials" } };
  }

  let user: User = normalizeUser(raw);

  return {
    success: true,
    user,
    remember,
  };
}
