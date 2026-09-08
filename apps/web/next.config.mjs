/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ums/shared', '@ums/types', '@ums/validation', '@ums/database'],
  experimental: {
    typedRoutes: false,
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
    outputFileTracingIncludes: {
      '/api/**/*': [
        '../../node_modules/.pnpm/@prisma+client*/**/*',
        '../../packages/database/prisma/**/*',
      ],
    },
  },
};

export default nextConfig;
