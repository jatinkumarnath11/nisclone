/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ums/shared', '@ums/types', '@ums/validation'],
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
