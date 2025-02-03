"use client";

import Link from "next/link";
import { SIDEBAR_ITEMS} from "@/constants/sidebar-content";
import { Button } from "@/components/ui/button";

interface SidebarItem {
    title: string
    url: string
    icon: React.FC
}

export function Sidebar() {
    const items: SidebarItem[] = SIDEBAR_ITEMS.Admin;
  return (
    <aside className="fixed top-14 left-0 z-40 w-72 h-[calc(100vh-56px)] bg-background shadow-lg border-r">
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto space-y-2">
        {items.map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            asChild
            className="justify-start w-full px-4 py-2 flex items-center gap-3"
          >
            <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
            </a>
          </Button>
       ))}
      </div>
    </aside>
  );
}
