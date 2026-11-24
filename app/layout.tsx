import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { SITE } from "@/lib/content";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: { title: SITE.title, description: SITE.description, siteName: "Keploy", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#fffdfa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
