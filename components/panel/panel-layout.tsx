"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "@/components/panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Navbar } from "@/components/panel/navbar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <main
          className={cn(
            "flex-1 min-h-screen transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
            "ml-0 lg:ml-72" // Default margin on large screens
          )}
        >
          <div className="container pt-8 pb-8 px-4 sm:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
