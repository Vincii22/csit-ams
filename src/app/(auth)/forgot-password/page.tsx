"use client";

import { ForgotPasswordForm } from "./form";
import AuthLayout from "../auth-layout";

export default function ForgotPasswordPage() {
  const image = {
    src: "/images/forgot-pass.jpg",
    alt: "Hailey Beiber commiting a sin",
    className: "object-left",
  };

  return <AuthLayout form={<ForgotPasswordForm />} image={image} />;
}
