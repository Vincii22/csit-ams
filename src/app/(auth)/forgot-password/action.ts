import { z } from "zod";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/client";

export async function forgotPassword(
  data: z.infer<typeof forgotPasswordSchema>,
) {
  const supabase = createClient();

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
