"use client";

import AuthLayout from "@/components/layouts/auth-layout";
import { ResetPasswordForm } from "./form";
import { useEffect } from "react";
import { redirectToClientError } from "@/lib/utils/redirect";
import { supabase } from "@/lib/supabase/client";
import { clearSearchParams } from "@/lib/utils/search-params";

const image = {
  src: "/images/reset-success.jpg",
  alt: "Sonic doing that hand rubbing, IYKYK",
};

const checkSession = async () => {
  const params = new URLSearchParams(window.location.search);

  const error = params.get("error");
  const errorCode = params.get("error_code");
  const errorDescription = params.get("error_description");

  if (error || errorCode || errorDescription) {
    return redirectToClientError({
      status: 401,
      message: "Invalid or expired link. Please request a new one.",
    });
  }

  const intent = params.get("intent");

  const { data, error: sessionError } = await supabase.auth.getSession();

  if (!data.session || sessionError || !intent) {
    return redirectToClientError({
      status: 403,
      message: "Use the reset link from your email.",
    });
  }

  // don't show 'intent' in search params
  clearSearchParams("intent");
};

export default function ResetPasswordPage() {
  useEffect(() => {
    checkSession();
  }, []);

  return <AuthLayout form={<ResetPasswordForm />} image={image} />;
}
