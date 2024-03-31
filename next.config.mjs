/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [{
                protocol: "https",
                hostname: "replicate.delivery",
            },
            {
                protocol: "https",
                hostname: "*.replicate.delivery",
            },
            {
                protocol: "http",
                hostname: "*.aliyuncs.com"
            },
            {
                protocol: "https",
                hostname: "*.aliyuncs.com"
            }
        ]
    }
};

export default nextConfig;