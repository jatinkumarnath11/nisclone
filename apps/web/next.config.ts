import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ums/shared', '@ums/types', '@ums/validation'],
};

export default nextConfig;
