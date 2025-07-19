"use client";

import { MessageCircleCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type AuthLayoutProps = {
  form: React.ReactNode;
  image: {
    src: string;
    alt: string;
    className?: string;
  };
};

export default function AuthLayout({ form, image }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[40vw_60vw]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Link
          href="/"
          className="flex justify-center gap-2 text-xl font-semibold md:justify-start"
        >
          <MessageCircleCode className="size-7" />
          Kumsociety
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{form}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={image.src}
          width={2000}
          height={2000}
          alt={image.alt}
          className={`absolute inset-0 h-full w-full object-cover ${image.className}`}
        />
      </div>
    </div>
  );
}
