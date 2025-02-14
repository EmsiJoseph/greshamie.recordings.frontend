import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: {
            bodySizeLimit: '1mb', // Set your desired limit
            allowedOrigins: ['http://localhost:3000'], // Configure origins as needed
        },  // Ensure this is enabled
    },
};

export default nextConfig;
