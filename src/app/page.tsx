"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/ui/loader";

export default function HomePage() {
  const router = useRouter();

  async function checkSession() {
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
