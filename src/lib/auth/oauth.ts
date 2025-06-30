import { supabase } from "@/lib/supabase/client";

export function signInWithGoogle() {
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback?next=/`,
    },
  });
}
