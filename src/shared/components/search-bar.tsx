"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

type SearchBarProps = {
  value: string;
  onChangeAction: (value: string) => void;
  placeholder?: string;
  className?: string;
};
export default function SearchBar({
  value,
  onChangeAction,
  placeholder = "Search...",
  className,
}: SearchBarProps) {
  const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);

  return (
    <div
      className={cn(
        "transition flex items-center gap-3 border-2 border-border bg-muted/15 py-2 px-4 rounded-lg w-[25rem]",
        isInputSearchFocused && "border-muted-foreground",
        className,
      )}
    >
      <Search className="size-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChangeAction(e.target.value)}
        className="!border-transparent !bg-transparent focus:outline-none w-full"
        placeholder={placeholder}
        onFocus={() => setIsInputSearchFocused(true)}
        onBlur={() => setIsInputSearchFocused(false)}
      />
    </div>
  );
}
