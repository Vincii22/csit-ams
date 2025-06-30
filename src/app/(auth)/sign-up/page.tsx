"use client";

import { SignUpForm } from "./form";
import AuthLayout from "@/components/layouts/auth-layout";

const image = {
  src: "/images/placeholder.jpg",
  alt: "Picture of a cool scene from Berserk",
};

export default function SignUpPage() {
  return <AuthLayout form={<SignUpForm />} image={image} />;
}
