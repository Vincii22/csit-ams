"use client";

import { SignInForm } from "./form";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import AuthLayout from "@/components/layouts/auth-layout";

export default function SignInPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectedFrom = searchParams.get("redirectedFrom");

    if (redirectedFrom) {
      setTimeout(() => {
        toast.warning("You are not signed in. Please login to proceed.");
      }, 0);
    }
  }, [searchParams]);

  const image = {
    src: "/images/placeholder.jpg",
    alt: "Picture of a cool scene from Berserk",
  };

  return <AuthLayout form={<SignInForm />} image={image} />;
}
