import type { Metadata } from "next";
import { weddingConfig } from "@/config/weddingConfig";

interface InviteLayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const rawId = resolved?.id || "";
  const formattedName = decodeURIComponent(rawId)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const guestName = formattedName && formattedName !== "Index" ? formattedName : "Distinguished Guest";

  const title = `Wedding Invitation for ${guestName} | ${weddingConfig.groom.callName} & ${weddingConfig.bride.callName}`;
  const description = `${weddingConfig.groom.callName} & ${weddingConfig.bride.callName} joyfully invite ${guestName} to celebrate their wedding on ${weddingConfig.date.displayDate} at ${weddingConfig.venue.name}, ${weddingConfig.venue.city}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: `${weddingConfig.groom.callName} & ${weddingConfig.bride.callName}'s Wedding`,
      images: [
        {
          url: "/images/couple_sketch.jpg",
          width: 1200,
          height: 630,
          alt: `${weddingConfig.groom.callName} & ${weddingConfig.bride.callName} Wedding Invitation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/couple_sketch.jpg"],
    },
  };
}

export default function InviteLayout({ children }: InviteLayoutProps) {
  return <>{children}</>;
}
