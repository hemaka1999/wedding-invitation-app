"use client";

import React, { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import { Guest } from "@/types";
import { apiService } from "@/services/apiService";
import WeddingInvitationCard from "@/components/invite/WeddingInvitationCard";

interface InvitePageProps {
  params: Promise<{ id: string }>;
}

export default function InvitePage({ params }: InvitePageProps) {
  const resolvedParams = use(params);
  const guestId = resolvedParams.id;
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (guestId) {
      apiService
        .getGuestById(guestId)
        .then((data) => {
          if (!data) {
            setIsNotFound(true);
          } else {
            setGuest(data);
          }
        })
        .catch(() => {
          setIsNotFound(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsNotFound(true);
      setIsLoading(false);
    }
  }, [guestId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-serif text-sm text-gold-700">
            Preparing your invitation...
          </p>
        </div>
      </div>
    );
  }

  if (isNotFound || !guest) {
    notFound();
  }

  return <WeddingInvitationCard guest={guest} />;
}
