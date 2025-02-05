"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-content";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.FC;
}

export function Sidebar() {
  const { isOpen } = useSidebarToggle();
  const items: SidebarItem[] = SIDEBAR_ITEMS.Admin;
  const pathname = usePathname(); // Get the current path

  return (
    <aside
      className={`
        fixed top-14 left-0 w-72 shadow-lg border-r
        duration-300 bg-white z-40 h-full
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Sidebar Content */}
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.url; // Check if current path matches item URL

          return (
            <Button
              key={item.title}
              variant="ghost"
              asChild
              className={`
                justify-start w-full px-4 py-2 flex items-center gap-3 
                transition-all duration-300 rounded-full
                ${
                  isActive
                    ? "bg-lime-50 shadow-[inset_0_0_0_2px_#65a30d] text-lime-700 font-semibold cursor-default hover:bg-lime-50 hover:text-lime-700"
                    : "hover:bg-gray-100 cursor-pointer"
                }
              `}
            >
              <Link href={item.url} className="flex items-center gap-3 w-full">
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
