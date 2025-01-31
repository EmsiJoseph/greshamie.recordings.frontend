"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

interface LayoutClientProps {
    children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
    // Initialize React Query client only once
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
        </QueryClientProvider>
    );
}