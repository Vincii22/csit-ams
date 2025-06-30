"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import { IconSizes } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

import { getNavItemsForRole, type NavItem } from "@/app/dashboard/_config/nav";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { ChevronRight, ChevronsDownUp, PanelRightDashed } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuthStore } from "@/lib/state/auth.store";

export default function Sidebar() {
  const { user } = useAuthStore();
  if (!user) return null;

  const navGroups = getNavItemsForRole(user.role);
  const pathname = usePathname();

  const [collapsedItems, setCollapsedItems] = useState<Record<string, boolean>>(
    {},
  );
  const [expandedSidebar, setExpandedSidebar] = useState(true);

  const setAllCollapsedItems = (state: boolean) => {
    const result: Record<string, boolean> = {};
    navGroups.forEach((group) =>
      group.forEach((item) => {
        if (item.children && item.title) {
          result[item.title] = state;
        }
      }),
    );
    setCollapsedItems(result);
  };

  const handleToggleAll = () => {
    const isAnyOpen = Object.values(collapsedItems).some((open) => open);
    setAllCollapsedItems(!isAnyOpen);
  };

  const collapseSidebar = () => {
    const isCollapsing = expandedSidebar;
    setExpandedSidebar(!expandedSidebar);

    if (isCollapsing) {
      setAllCollapsedItems(false);
    }
  };

  return (
    <motion.aside
      className={clsx(
        "flex flex-col justify-between border-r border-border",
        expandedSidebar ? "w-[15rem]" : "w-[56px] overflow-hidden",
      )}
      animate={{ width: expandedSidebar ? "15rem" : "56px" }}
    >
      <nav className="grid">
        <div
          className={clsx(
            "flex items-center px-3 pt-3 p-1",
            expandedSidebar ? "justify-between" : "justify-center",
          )}
        >
          <AnimatePresence>
            {expandedSidebar && (
              <motion.div
                className="w-[140px] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="font-semibold text-muted-foreground whitespace-nowrap">
                  caenar was here
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center">
            {expandedSidebar && (
              <Button
                variant="ghost"
                className="!p-3.5 h-[10px] w-[10px] text-muted-foreground"
                title="Toggle all items"
                onClick={handleToggleAll}
              >
                <ChevronsDownUp className="size-4.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              className="!p-3.5 h-[10px] w-[10px] text-muted-foreground"
              title="Collapse sidebar"
              onClick={() => collapseSidebar()}
            >
              <PanelRightDashed className="size-4.5" />
            </Button>
          </div>
        </div>
        {navGroups.map((group, groupIndex) => (
          <Fragment key={`group-${groupIndex}`}>
            <div className="grid gap-1 p-3">
              {group.map((item, itemIndex) =>
                item.children ? (
                  <SidebarCollapsible
                    key={item.title ?? itemIndex}
                    item={item}
                    pathname={pathname}
                    collapsed={expandedSidebar}
                    isOpen={collapsedItems[item.title ?? ""] ?? false}
                    onToggle={() => {
                      if (!expandedSidebar) setExpandedSidebar(true);
                      setCollapsedItems((prev) => ({
                        ...prev,
                        [item.title ?? ""]: !prev[item.title ?? ""],
                      }));
                    }}
                  />
                ) : (
                  <SidebarLink
                    key={item.title ?? itemIndex}
                    item={item}
                    pathname={pathname}
                    collapsed={expandedSidebar}
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
    </motion.aside>
  );
}

const navLinkBase =
  "h-9 flex items-center gap-3 px-2 rounded-md cursor-pointer hover:bg-border hover:text-white transition";

function SidebarLink({
  item,
  pathname,
  collapsed,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
}) {
  const isActive = item.href === pathname;

  return (
    <Link
      href={item.href ?? "#"}
      className={clsx(navLinkBase, isActive && "bg-border text-white")}
      title={item.title}
    >
      {item.icon && (
        <DynamicIcon name={item.icon as IconName} size={IconSizes.SMALL} />
      )}
      {collapsed && item.title}
    </Link>
  );
}

function SidebarCollapsible({
  item,
  pathname,
  collapsed,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
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
        onClick={onToggle}
        title={item.title}
      >
        <div className="flex items-center gap-3">
          {item.icon && (
            <DynamicIcon name={item.icon as IconName} size={IconSizes.SMALL} />
          )}
          {collapsed && item.title}
        </div>
        {collapsed && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        )}
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
