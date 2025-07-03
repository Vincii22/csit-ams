"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/state/auth.store";
import { redirectToClientError } from "@/lib/utils/redirect";
import { fetchUser } from "@/lib/db/fetch-user";

export function useAuth() {
  const { user, expiresAt, clearUser, setUser, setRemember } = useAuthStore();

  function checkSession({
    redirect = true,
  }: { redirect?: boolean; withLoading?: boolean } = {}) {
    useEffect(() => {
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);

        if (user && expiresAt && now > expiresAt) {
          clearUser();
          supabase.auth.signOut();

          if (redirect) {
            redirectToClientError({
              status: 401,
              message: "Your session has expired",
              action: "sign-in",
            });
          }
        }
      }, 10_000);

      return () => clearInterval(interval);
    }, [user, expiresAt]);
  }

  const rehydrate = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) return false;

    const user = await fetchUser(data.session.user.email ?? "");
    if (!user) return false;

    setUser(user);
    return true;
  }, [setUser]);

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Could not sign out. Please try again.");
      return;
    }

    clearUser();
    window.location.href = "/sign-in";
  }

  function signInWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/`,
      },
    });
  }

  return {
    user,
    checkSession,
    rehydrate,
    logout,
    signInWithGoogle,
    setRemember,
    setUser,
    clearUser,
  };
}
