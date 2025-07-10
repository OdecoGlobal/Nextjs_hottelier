import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.43.214', '*.192.168.43.214'],
  crossOrigin: 'use-credentials',
};

export default nextConfig;
