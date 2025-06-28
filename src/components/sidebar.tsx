"use client";

import { IconSizes } from "@/lib/constants";
import { MessageCircleCode } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="border-r border-border p-3">
      <Link
        href="/dashboard"
        className="flex justify-center gap-2 text-xl font-semibold md:justify-start"
      >
        <MessageCircleCode size={IconSizes.XL} />
        Kumsociety
      </Link>
      <nav></nav>
    </aside>
  );
}
