"use client";

import { useEffect, useState } from "react";
import { SignInForm } from "./form";
import AuthLayout from "@/components/layouts/auth-layout";
import { clearSearchParams } from "@/lib/utils/search-params";

const image = {
  src: "/images/placeholder.jpg",
  alt: "Picture of a cool scene from Berserk",
};

export default function SignInPage() {
  const [redirectedFrom, setRedirectedFrom] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("redirectedFrom");

    if (!raw) return;
    const from = decodeURIComponent(raw);

    if (from) {
      setRedirectedFrom(from);
      clearSearchParams("redirectedFrom");
    }
  }, []);

  return (
    <AuthLayout
      form={<SignInForm redirectedFrom={redirectedFrom} />}
      image={image}
    />
  );
}
