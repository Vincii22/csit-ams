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

export function useRehydrateAuth() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function rehydrate() {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user) return;

      const user = data.session.user;

      setUser({
        id: user.id,
        fullName: user.user_metadata.full_name ?? "Anonymous",
        email: user.email!,
        role: "officer",
        yearLevel: 1,
        course: "BSIT",
        position: "External Vice President",
      });
    }

    rehydrate();
  }, [setUser]);
}
