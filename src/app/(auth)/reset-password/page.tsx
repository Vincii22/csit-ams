"use client";

import AuthLayout from "@/components/layouts/auth-layout";
import { ResetPasswordForm } from "./form";

const image = {
  src: "/images/reset-success.jpg",
  alt: "Sonic doing that hand rubbing, IYKYK",
};

export default function ResetPasswordPage() {
  return <AuthLayout form={<ResetPasswordForm />} image={image} />;
}
