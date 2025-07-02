import { z } from "zod";
import { resetPasswordSchema } from "@/lib/schemas/auth.schema";
import { createClient } from "@/lib/supabase/client";

export async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password: data.password });

  if (error) {
    return { success: false, error: { message: error.message } };
  }

  return {
    success: true,
  };
}
