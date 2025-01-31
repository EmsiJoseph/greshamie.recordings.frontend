"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

interface ReactQueryContextProps {
    children: React.ReactNode;
}

export default function ReactQueryContext({ children }: ReactQueryContextProps) {
    // Initialize React Query client only once
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
        </QueryClientProvider>
    );
}