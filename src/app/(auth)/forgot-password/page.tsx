"use client";

import AuthLayout from "@/components/layouts/auth-layout";
import { ForgotPasswordForm } from "./form";

const image = {
  src: "/images/forgot-pass.jpg",
  alt: "Hailey Beiber commiting a sin",
  className: "object-left",
};

export default function ForgotPasswordPage() {
  return <AuthLayout form={<ForgotPasswordForm />} image={image} />;
}
