import { geistMono, geistSans, playfair, cursiveFont } from "@/fonts/fonts";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./Providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Calaraya Project",
  description: "Digital Invitation & Website",
  openGraph: {
    title: "Calaraya Project",
    description: "Digital Invitation & Website",
    url: `${process.env.NEXT_PUBLIC_APP_URL_PROD!}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL_PROD!}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cursiveFont.variable} antialiased`}
      >
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>

        {/* Cloudinary Upload Widget */}
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
