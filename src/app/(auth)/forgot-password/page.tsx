"use client";

import AuthLayout from "@/components/layouts/auth-layout";
import { ForgotPasswordForm } from "./form";

export default function ForgotPasswordPage() {
  const image = {
    src: "/images/forgot-pass.jpg",
    alt: "Hailey Beiber commiting a sin",
    className: "object-left",
  };

  return <AuthLayout form={<ForgotPasswordForm />} image={image} />;
}
