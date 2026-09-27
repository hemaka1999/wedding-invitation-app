import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { weddingConfig } from "@/config/weddingConfig";
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
  title: `Wedding Invitation | ${weddingConfig.groom.callName} & ${weddingConfig.bride.callName}`,
  description: `${weddingConfig.invitationNote} on ${weddingConfig.date.displayDate} at ${weddingConfig.venue.name}, ${weddingConfig.venue.city}.`,
  openGraph: {
    title: `Wedding Invitation | ${weddingConfig.groom.callName} & ${weddingConfig.bride.callName}`,
    description: weddingConfig.invitationNote,
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
