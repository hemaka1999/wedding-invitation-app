import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${plusJakarta.variable}`}
    >
      <body className="font-body min-h-screen bg-[#E8E3DA] text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}
