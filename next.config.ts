import type { NextConfig } from "next";

const clientAppUri = process.env.NEXT_PUBLIC_CLIENT_APP_URI || "http://localhost:3000";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: {
            bodySizeLimit: '1mb', // Set your desired limit
            allowedOrigins: [clientAppUri], // Add environment variable dynamically
        },
    },
};

export default nextConfig;
