"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/state/auth.store";

import {
  BugIcon,
  CircleHelp,
  ExternalLink,
  Inbox,
  LightbulbIcon,
  MessageCircleCode,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import { IconSizes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";

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
          <FeedbackButton />
          <div className="border border-border rounded-3xl">
            <HelpButton />
            <NotificationButton />
          </div>
          <Avatar user={user} />
        </div>
      </header>
      <Sidebar role={user.role} />
      <main className="overflow-y-scroll">{children}</main>
    </div>
  );
}

function NotificationButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="rounded-r-3xl rounded-l-[0] !pl-1.5"
          title="Notifications"
        >
          <Inbox className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={7} className="!p-0 min-w-sm ">
        <h3 className="font-semibold p-3">Notifications</h3>
        <Tabs defaultValue="inbox">
          <TabsList className="px-3">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent
            value="inbox"
            className="min-h-[300px] flex flex-col justify-center items-center"
          >
            <Inbox size={32} className="text-muted mb-3" />
            <Label className="text-muted mb-1">Nothing to show here</Label>
          </TabsContent>
          <TabsContent
            value="archived"
            className="min-h-[300px] flex flex-col justify-center items-center"
          >
            <Inbox size={32} className="text-muted mb-3" />
            <Label className="text-muted mb-1">No archived notifications</Label>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

function FeedbackButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="text-sm rounded-3xl ">
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={7} className="!p-3 grid gap-4">
        <h3 className="font-semibold">Got anything in mind?</h3>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
          consectetur.
        </p>
        <div className="grid mt-1 rounded-md border border-border">
          <Button
            size="sm"
            variant="ghost"
            className="!rounded-b-[0] justify-start text-sm"
          >
            <LightbulbIcon className="size-4.5 text-muted-foreground" />
            Suggest an idea
          </Button>
          <Separator className="!m-0" />
          <Button
            size="sm"
            variant="ghost"
            className="!rounded-t-[0] justify-start text-sm"
          >
            <BugIcon className="size-4.5 text-muted-foreground" />
            Report an issue
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function HelpButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="rounded-l-3xl rounded-r-[0] !pr-1.5"
          title="Help"
        >
          <CircleHelp className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={7} className="!p-0">
        <div className="p-3 grid gap-4">
          <h3 className="font-semibold">Need help in something?</h3>
          <p className="text-sm text-muted-foreground">
            Stuck on something you can't figure out? You could try these options
            out.
          </p>
          <div className="grid mt-1 rounded-md border border-border">
            <Button
              size="sm"
              variant="ghost"
              className="!rounded-b-[0] justify-start text-sm"
            >
              <LightbulbIcon className="size-4.5 text-muted-foreground" />
              Check out the manual
            </Button>
            <Separator className="!m-0" />
            <Button
              size="sm"
              variant="ghost"
              className="!rounded-t-[0] justify-start text-sm"
            >
              <BugIcon className="size-4.5 text-muted-foreground" />
              Contact support
            </Button>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="px-3 pb-4 grid gap-4">
          <h3 className="font-semibold">Facebook pages</h3>
          <p className="text-sm text-muted-foreground">
            We can always refer to the official page or from the official school
            facebook page.
          </p>
          <div className="btn-container">
            <a href="#">
              <Button
                variant="outline"
                size="sm"
                className="!px-2.5 !h-7 text-sm"
              >
                Official page
                <ExternalLink className="size-3.5 text-muted-foreground" />
              </Button>
            </a>
            <a href="#">
              <Button
                variant="outline"
                size="sm"
                className="!px-2.5 !h-7 text-sm"
              >
                School page
                <ExternalLink className="size-3.5 text-muted-foreground" />
              </Button>
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
