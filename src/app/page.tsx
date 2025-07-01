"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/use-auth";
import Loader from "@/components/ui/loader";

export default function App() {
  const router = useRouter();
  const { rehydrate } = useAuth();

  useEffect(() => {
    async function init() {
      const isSignedIn = await rehydrate();
      router.replace(isSignedIn ? "/dashboard" : "/sign-in");
    }

    init();
  }, [rehydrate, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}
