"use client";

import { User } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/shared/hooks/use-auth";

export default function Avatar({ user }: { user: User }) {
  const { logout } = useAuth();

  const nameParts = user.name.trim().split(" ");
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() ?? "?";
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase()
      : "";

  const initials = `${firstInitial}${lastInitial}`;

  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer flex items-center justify-center bg-pink-400 p-1 rounded-4xl w-8 h-8">
          <span className="font-bold text-sm text-pink-100">{initials}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={7} className="!p-0">
        <div className="px-3 py-3">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Separator />
        <div className="grid text-muted-foreground">
          <Button
            variant="ghost"
            className="justify-start !rounded-t-[0]"
            onClick={logout}
          >
            <LogOut className="size-4.5" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
