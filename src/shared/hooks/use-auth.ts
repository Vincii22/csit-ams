import { useAuthStore } from "@/lib/state/auth.store";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useAuthSessionCheck() {
  const { user, expiresAt, clearUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user && expiresAt && Math.floor(Date.now() / 1000) > expiresAt) {
      clearUser();
      router.replace("sign-in");
      toast.info("Session expired. Please sign in again.");
    }
  }, []);
}

export function signInWithGoogle() {
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
}
