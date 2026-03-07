import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",

  subsets: ["latin"],

  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",

  subsets: ["latin"],

  display: "swap",
});

export const metadata: Metadata = {
  title: "DevTrailer - AI-Powered Video Trailers for Developers",

  description:
    "Turn your project documentation and live website into cinematic promo videos in seconds with AI.",

  keywords: ["DevTrailer", "AI video", "marketing", "developers", "automation"],

  openGraph: {
    title: "DevTrailer - AI-Powered Video Trailers",

    description:
      "Automate your project marketing with AI-generated video trailers",

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeToggle />

          {children}

          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
