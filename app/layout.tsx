import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pasar Mini Myra",
  description: "Nak Lagi Tak? Ada Lagi Tak? Order now and have the best Raya!",

  // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    type: "website",
    url: "https://pasarminimyra.vercel.app",
    title: "Pasar Mini Myra",
    description: "Nak Lagi Tak? Ada Lagi Tak? Order now and have the best Raya!",
    images: [
      {
        url: "https://pasarminimyra.vercel.app/iconold.webp",
        width: 1200,
        height: 630,
        alt: "Pasar Mini Myra",
        type: "image/webp",
      },
    ],
  },

  // Twitter/X Card
  twitter: {
    card: "summary_large_image",
    title: "Pasar Mini Myra",
    description: "Nak Lagi Tak? Ada Lagi Tak? Order now and have the best Raya!",
    images: ["https://pasarminimyra.vercel.app/iconold.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/icon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/icon.webp" />

        {/* Theme Color */}
        <meta name="theme-color" content="#FFF3B0" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pasarminimyra.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
