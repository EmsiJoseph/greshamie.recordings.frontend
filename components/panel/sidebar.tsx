"use client";

import Link from "next/link";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-content";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "./sidebar-toggle";

interface SidebarItem {
    title: string;
    url: string;
    icon: React.FC;
}

export function Sidebar() {
    const { isOpen, setIsOpen } = useSidebarToggle();
    const items: SidebarItem[] = SIDEBAR_ITEMS.Admin;

    return (
        <>

            <aside 
                className={`
                    fixed top-14 left-0 w-72 shadow-lg border-r
                    s  duration-300 bg-white z-40 h-full
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Sidebar Content */}
                <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto space-y-2">
                    {items.map((item) => (
                        <Button
                            key={item.title}
                            variant="ghost"
                            asChild
                            className="justify-start w-full px-4 py-2 flex items-center gap-3"
                        >
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </aside>
        </>
    );
}
