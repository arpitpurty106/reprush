import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RepRush — Your AI Training Partner",
  description:
    "RepRush builds your workout plan, coaches your form, and tracks every rep — free, for everyone. No gym required.",
  keywords: ["AI gym trainer", "workout planner", "free fitness app", "RepRush"],
  openGraph: {
    title: "RepRush — Your AI Training Partner",
    description:
      "Free AI-powered workout plans, form coaching, and progress tracking.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14171A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-ink text-chalk antialiased bg-noise min-h-screen">
        {children}
      </body>
    </html>
  );
}
