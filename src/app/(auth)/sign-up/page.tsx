"use client";

import { SignUpForm } from "./form";
import AuthLayout from "../auth-layout";

export default function SignUpPage() {
  const image = {
    src: "/images/placeholder.jpg",
    alt: "Picture of a cool scene from Berserk",
  };

  return <AuthLayout form={<SignUpForm />} image={image} />;
}
