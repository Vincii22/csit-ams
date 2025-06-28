"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { getNavItemsForRole, type NavItem } from "@/app/dashboard/_config/nav";
import { AnimatePresence, motion } from "motion/react";
import { IconSizes } from "@/lib/constants";
import { Role } from "@/lib/types";
import Link from "next/link";

import { ChevronRight, PanelRightDashed } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type SidebarProps = {
  role: Role;
};

export default function Sidebar({ role }: SidebarProps) {
  const navGroups = getNavItemsForRole(role);
  const pathname = usePathname();

  return (
    <aside className="flex flex-col justify-between border-r border-border">
      <nav className="grid">
        {navGroups.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`}>
            <div className="grid gap-1 p-3">
              {group.map((item, itemIndex) =>
                item.children ? (
                  <CollapsibleNavbarLink
                    key={item.title ?? `navitem-${itemIndex}`}
                    item={item}
                    activePath={pathname}
                  />
                ) : (
                  <SidebarNavLink
                    key={item.title ?? `navitem-${itemIndex}`}
                    item={item}
                    activePath={pathname}
                  />
                ),
              )}
            </div>
            {groupIndex !== navGroups.length - 1 && <Separator />}
          </div>
        ))}
      </nav>
      <Button
        variant="ghost"
        className="!p-3.5 h-[10px] w-[10px] self-end m-2 text-muted-foreground"
      >
        <PanelRightDashed />
      </Button>
    </aside>
  );
}

const navLinkClass =
  "flex items-center gap-3 py-1.5 px-2 rounded-md cursor-pointer hover:bg-border hover:text-white transition";

function CollapsibleNavbarLink({
  item,
  activePath,
}: {
  item: NavItem;
  activePath: string;
}) {
  const isActive = item.href === activePath;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={clsx(
          navLinkClass,
          isActive && "bg-border",
          "justify-between",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 z-2">
          {item.icon && (
            <DynamicIcon name={item.icon as IconName} size={IconSizes.SMALL} />
          )}
          {item.title}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0 }}
            className="grid gap-1 ml-4 border-l border-border overflow-hidden"
          >
            {item.children?.map((item, index) => (
              <Link
                key={`nav-child-item-${index}`}
                href={item.href ? item.href : ""}
                className="pl-4 py-0.5 text-muted-foreground hover:text-white transition"
              >
                {item.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarNavLink({
  item,
  activePath,
}: {
  item: NavItem;
  activePath: string;
}) {
  const isActive = item.href === activePath;

  return (
    <Link
      href={item.href ?? "#"}
      className={clsx(navLinkClass, isActive && "bg-border text-white")}
    >
      {item.icon && (
        <DynamicIcon name={item.icon as IconName} size={IconSizes.SMALL} />
      )}
      {item.title}
    </Link>
  );
}
