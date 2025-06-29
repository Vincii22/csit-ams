"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import { IconSizes } from "@/lib/constants";
import { Role } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

import { getNavItemsForRole, type NavItem } from "@/app/dashboard/_config/nav";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
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
          <Fragment key={`group-${groupIndex}`}>
            <div className="grid gap-1 p-3">
              {group.map((item, itemIndex) =>
                item.children ? (
                  <SidebarCollapsible
                    key={item.title ?? itemIndex}
                    item={item}
                    pathname={pathname}
                  />
                ) : (
                  <SidebarLink
                    key={item.title ?? itemIndex}
                    item={item}
                    pathname={pathname}
                  />
                ),
              )}
            </div>
            {groupIndex !== navGroups.length - 1 && (
              <Separator className="my-0.5" />
            )}
          </Fragment>
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

const navLinkBase =
  "flex items-center gap-3 py-1.5 px-2 rounded-md cursor-pointer hover:bg-border hover:text-white transition";

function SidebarLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = item.href === pathname;

  return (
    <Link
      href={item.href ?? "#"}
      className={clsx(navLinkBase, isActive && "bg-border text-white")}
    >
      {item.icon && (
        <DynamicIcon name={item.icon as IconName} size={IconSizes.SMALL} />
      )}
      {item.title}
    </Link>
  );
}

function SidebarCollapsible({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname.startsWith(
    `/dashboard/${item.title?.toLowerCase()}`,
  );

  return (
    <div>
      <button
        type="button"
        className={clsx(
          navLinkBase,
          "justify-between w-full",
          isActive && "bg-border",
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
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
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-sm grid gap-1 ml-4 border-l border-border pl-3 py-1 overflow-hidden"
          >
            {item.children?.map((child, index) => {
              const isActive = pathname === child.href;

              return (
                <Link
                  key={`nav-child-${index}`}
                  href={child.href ?? "#"}
                  className={clsx(
                    "pl-1 py-0.5 text-muted-foreground hover:text-white transition",
                    isActive && "text-white font-medium",
                  )}
                >
                  {child.title}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
