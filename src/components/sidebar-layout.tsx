"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/state/auth.store";

import { CircleHelp, Inbox, MessageCircleCode } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { IconSizes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  if (!user) return;

  return (
    <div className="grid grid-rows-[fit-content(100%)_1fr] grid-cols-[14rem_1fr] min-h-svh overflow-hidden">
      <header className="flex justify-between items-center border-b border-border col-span-2 h-14 px-4">
        <Link
          href="/dashboard"
          className="flex justify-center gap-2 text-xl font-semibold md:justify-start"
        >
          <MessageCircleCode size={IconSizes.XL} />
          Kumsociety
        </Link>
        <div className="flex gap-2 items-center">
          <Link href="/dashboard/feedback">
            <Button
              size="sm"
              variant="outline"
              className="text-sm rounded-3xl "
            >
              Feedback
            </Button>
          </Link>

          <div className="border border-border rounded-3xl">
            <Link href="/dashboard/manual">
              <Button
                size="sm"
                variant="ghost"
                className="rounded-l-3xl rounded-r-[0] !pr-1.5"
                title="Help"
              >
                <CircleHelp className="size-5" />
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-r-3xl rounded-l-[0] !pl-1.5"
              title="Notifications"
            >
              <Inbox className="size-5" />
            </Button>
          </div>
          <div>
            <Avatar user={user} />
          </div>
        </div>
      </header>
      <Sidebar role={user.role} />
      <main className="overflow-y-scroll">{children}</main>
    </div>
  );
}
