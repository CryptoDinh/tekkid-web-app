/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Use static export
  // unoptimized: true, // Disable image optimization for local images
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.poki-cdn.com',
        pathname: '/**',
      },new URL('https://img.gamemonetize.com/**')
    ],  
  },
};

export default nextConfig;
