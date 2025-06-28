import Link from "next/link";
import { useAuthStore } from "@/lib/state/auth.store";

import {
  Inbox,
  LucideMessageCircleQuestion,
  MessageCircleCode,
} from "lucide-react";
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
          <div className="flex gap-1.5">
            <Button className="rounded-3xl">Feedback</Button>
            <Button variant="outline" className="rounded-3xl" title="Help">
              <LucideMessageCircleQuestion />
            </Button>
            <Button
              variant="outline"
              className="rounded-3xl"
              title="Notifications"
            >
              <Inbox />
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
