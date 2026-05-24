import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { BottomNav } from "@/components/shared/BottomNav";
import { FloatingActions } from "@/components/shared/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#a78bfa",
};

export const metadata: Metadata = {
  title: "MindSpace — Your Digital Wellness Companion",
  description:
    "A calming space for Gen Z to practice digital well-being, track mood, reflect on screen time, and build healthier tech habits.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MindSpace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <ToastProvider>
          {children}
          <BottomNav />
          <FloatingActions />
        </ToastProvider>
      </body>
    </html>
  );
}
