import type { NextConfig } from "next";

const clientAppUri = process.env.NEXT_PUBLIC_CLIENT_APP_URI || "http://localhost:3000";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    distDir: "build",
    output: "standalone"
};

export default nextConfig;
