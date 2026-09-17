"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Guest } from "@/types";
import { apiService } from "@/services/apiService";
import WeddingInvitationCard from "@/components/invite/WeddingInvitationCard";

function HomePageContent() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get("id");
  const [guest, setGuest] = useState<Guest | null>(null);

  useEffect(() => {
    if (idFromQuery) {
      apiService.getGuestById(idFromQuery).then((data) => {
        setGuest(data);
      });
    }
  }, [idFromQuery]);

  return <WeddingInvitationCard guest={guest} />;
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
          <p className="font-serif text-sm text-gold-700">Loading Invitation...</p>
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
