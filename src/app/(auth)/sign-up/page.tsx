"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { SignUpForm } from "./form";
import AuthLayout from "@/components/layouts/auth-layout";

export default function SignUpPage() {
  const image = {
    src: "/images/placeholder.jpg",
    alt: "Picture of a cool scene from Berserk",
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("redirectedFrom")) {
      toast.warning("You are not signed in. Please login to proceed.");
    }
  }, []);

  return <AuthLayout form={<SignUpForm />} image={image} />;
}
