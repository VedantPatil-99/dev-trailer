import type { Metadata, Viewport } from "next";
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
  title: "DevTrailer - AI-Powered Video Trailers for Developers",
  description:
    "Turn your project documentation and live website into cinematic promo videos in seconds with AI.",
  keywords: ["DevTrailer", "AI video", "marketing", "developers", "automation"],
  openGraph: {
    title: "DevTrailer - AI-Powered Video Trailers",
    description: "Automate your project marketing with AI-generated video trailers",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
