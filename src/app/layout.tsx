'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DebugOverlay from "@/components/DebugOverlay";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "GameHub - Free Online Games",
//   description: "Play the best free online games at GameHub. No downloads, no login, just instant fun!",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content='width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no'
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link
          rel="preload"
          href="/fonts/proxima-nova-regular-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/proxima-nova-bold-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/torus-bold-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/noto-sans-arabic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
