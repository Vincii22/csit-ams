"use client";

import { createClient } from "../supabase/client";

export function signInWithGoogle() {
  const supabase = createClient();
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback?next=/`,
    },
  });
}
