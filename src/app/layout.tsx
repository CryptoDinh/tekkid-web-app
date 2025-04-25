// Project: Tekkid - Free Online Games
import type { Metadata } from "next";
import "./globals.css";
import DebugOverlay from "@/components/DebugOverlay";

export const metadata: Metadata = {
  title: {
    default: "Tekkid - Free Online Games",
    template: "%s | Tekkid",
  },
  description: "Play the best free online games at Tekkid. No downloads, no login, just instant fun!",
  metadataBase: new URL("https://tekkid.com"),
  openGraph: {
    title: "Tekkid - Free Online Games",
    description: "Play the best free online games at Tekkid. No downloads, no login, just instant fun!",
    url: "https://tekkid.com",
    siteName: "Tekkid",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Tekkid - Free Online Games",
      },
    ],
    locale: "en_US",
    type: "website",
  },

};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimalUi: true,
  shrinkToFit: false,
  viewportFit: "cover",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Tekkid" />
        <meta name="color-scheme" content="only light" />
        <meta name="robots" content="max-image-preview:large" />
        <meta name="format-detection" content="telephone=no" />
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
      <body>
        {/* <DebugOverlay /> */}
        {children}
      </body>
    </html>
  );
}
