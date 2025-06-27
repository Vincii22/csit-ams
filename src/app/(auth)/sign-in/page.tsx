"use client";

import Image from "next/image";
import { SignInForm } from "./form";
import { MessageCircleCode } from "lucide-react";
import { IconSizes } from "@/lib/constants";

export default function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[40vw_60vw]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 font-semibold text-xl md:justify-start">
          <MessageCircleCode size={IconSizes.XL} />
          Kumsociety
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/placeholder.jpg"
          width={2000}
          height={2000}
          alt="Slay"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
