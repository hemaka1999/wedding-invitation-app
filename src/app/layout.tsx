import type { Metadata } from "next";
import { Cinzel, Great_Vibes, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Invitation | Kasun & Nethmi",
  description: "Together with their parents, Kasun & Nethmi joyfully invite you to celebrate their holy matrimony on Sunday, 18th October 2026 at Shangri-La Hotel, Colombo.",
  openGraph: {
    title: "Wedding Invitation | Kasun & Nethmi",
    description: "Together with their parents, Kasun & Nethmi joyfully invite you to celebrate their wedding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${greatVibes.variable} ${inter.variable}`}>
      <body className="font-body min-h-screen bg-[#FAF8F5]">{children}</body>
    </html>
  );
}
