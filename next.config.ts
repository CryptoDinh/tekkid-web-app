/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.poki-cdn.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Disable image optimization for local images
  },
};

export default nextConfig;
