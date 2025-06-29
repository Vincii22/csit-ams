"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/lib/state/auth.store";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

export default function OAuthCallback() {
  const router = useRouter();
  const { setUser, setRemember } = useAuthStore();

  useEffect(() => {
    async function handleOAuth() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        toast.error("OAuth sign-in failed");
        router.replace("/sign-in");
        return;
      }

      const user = data.user;

      setUser({
        id: user.id,
        fullName: user.user_metadata.full_name ?? "Anonymous",
        email: user.email!,

        // fetch from DB later
        role: "officer",
        yearLevel: 1,
        course: "BSIT",
        position: "External Vice President",
      });

      // by default, remember them for 3 days
      setRemember(true);

      router.replace("/dashboard");
    }

    handleOAuth();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}
