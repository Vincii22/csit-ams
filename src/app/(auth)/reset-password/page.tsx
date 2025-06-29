"use client";

import AuthLayout from "@/components/layouts/auth-layout";
import { ResetPasswordForm } from "./form";

export default function ResetPasswordPage() {
  const image = {
    src: "/images/reset-success.jpg",
    alt: "Sonic doing that hand rubbing, IYKYK",
  };

  return <AuthLayout form={<ResetPasswordForm />} image={image} />;
}
