"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "@/components/panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Navbar } from "@/components/panel/navbar";

export default function PanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  // Initialize React Query client
  const [queryClient] = useState(() => new QueryClient());

  if (!sidebar) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />

          {/* Main content with margin adjustment */}
          <main
            className={cn(
              "flex-1 min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 ",
              sidebar?.isOpen === false ? "lg:ml-72" : "lg:ml-96"
            )}
          >
            <div className="container pt-8 pb-8 px-4 sm:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}