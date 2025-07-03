import { z } from "zod";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/client";
import { fetchUser } from "@/lib/db/fetch-user";

export async function forgotPassword(
  data: z.infer<typeof forgotPasswordSchema>,
) {
  const supabase = createClient();

  const user = await fetchUser(data.email);

  if (!user) {
    return {
      success: false,
      error: { message: "If an account exists, a reset link has been sent" },
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: "http://localhost:3000/reset-password?intent=reset",
  });

  if (error) {
    return { success: false, error: { message: error.message } };
  }

  return {
    success: true,
  };
}
