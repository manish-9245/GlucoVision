import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";
import { RegisterSW } from "@/components/RegisterSW";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300","400","500","600","700","800"] });
const instrument = Instrument_Serif({ variable: "--font-display", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "GlucoVision, Clear DR Screening for Rural India",
  description: "AI diabetic retinopathy screening and care platform for PHCs. Ready to use, explainable, eSanjeevani ready. Works with ophthalmoscope and phone, results in under 2.1s on your device.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GlucoVision",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${instrument.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFCF9] text-zinc-900 selection:bg-teal-600 selection:text-white">
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
        <RegisterSW />
      </body>
    </html>
  );
}
