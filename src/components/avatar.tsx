import { User } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Avatar({ user }: { user: User }) {
  const initials = user.fullName.split(" ");
  const firstInitial = initials[0].charAt(0);
  const lastInitial = initials[initials.length - 1].charAt(0);

  const size = 30;

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={`flex items-center justify-center bg-pink-400 h-[${size}px] w-[${size}px] rounded-4xl`}
        >
          <span className="font-bold text-sm text-pink-100">{`${firstInitial}${lastInitial}`}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={7} className="!p-0">
        <div className="px-4 py-3">
          <h3 className="font-bold">{user.fullName}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Separator />
        <div className="grid p-1 text-muted-foreground">
          <Button variant="ghost" className="justify-start">
            <LogOut className="size-4.5" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
