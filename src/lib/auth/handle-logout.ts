"use client";

import { toast } from "sonner";
import { useAuthStore } from "../state/auth.store";
import { supabase } from "@/lib/supabase/client";

export async function handleLogout() {
  const { clearUser } = useAuthStore.getState();
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Could not sign out. Please try again.");
    return;
  }

  clearUser();

  // full page reload to clear session
  window.location.href = "/sign-in";
}
