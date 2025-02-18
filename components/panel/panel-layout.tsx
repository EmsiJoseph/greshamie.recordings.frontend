"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "@/components/panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/panel/navbar";
import { Toaster } from "../ui/toaster";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function PanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  // Initialize React Query client
  const staleTime = 1000 * 60 * 3; // 3min Default staleTime for all queries
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: staleTime,
        refetchOnWindowFocus: false,
      },
    },
  })

  if (!sidebar) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="flex flex-col w-full">
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        <div className="flex flex-1 w-full">
          <Sidebar />

          {/* Main content with margin adjustment */}
          <main
            className={cn(
              "w-full flex-1 overflow-x-auto dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 lg:ml-72"
            )}
          >
            <div className="w-full pt-8 pb-8 px-4 sm:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}