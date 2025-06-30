"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { useRehydrateAuth } from "@/shared/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

export default function App() {
  const router = useRouter();

  useRehydrateAuth();

  async function checkSession() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    data.user ? router.replace("/dashboard") : router.replace("/sign-in");
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}
