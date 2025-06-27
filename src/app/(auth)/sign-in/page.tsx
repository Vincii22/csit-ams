"use client";

import { SignInForm } from "./form";
import AuthLayout from "../auth-layout";

export default function SignInPage() {
  const image = {
    src: "/images/placeholder.jpg",
    alt: "Picture of a cool scene from Berserk",
  };

  return <AuthLayout form={<SignInForm />} image={image} />;
}
