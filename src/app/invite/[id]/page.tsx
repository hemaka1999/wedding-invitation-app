"use client";

import React, { useEffect, useState, use } from "react";
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

  useEffect(() => {
    if (guestId) {
      apiService
        .getGuestById(guestId)
        .then((data) => {
          if (data) {
            setGuest(data);
          } else {
            // Graceful fallback for preview / offline ID
            const formattedName = decodeURIComponent(guestId)
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
            
            setGuest({
              id: guestId,
              title: "",
              guest_name: formattedName || "Distinguished Guest",
              invitation_type: "Single",
              seats: 1,
              rsvp_status: "Pending",
              attending_count: 0,
            });
          }
        })
        .catch(() => {
          const formattedName = decodeURIComponent(guestId)
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          
          setGuest({
            id: guestId,
            title: "",
            guest_name: formattedName || "Distinguished Guest",
            invitation_type: "Single",
            seats: 1,
            rsvp_status: "Pending",
            attending_count: 0,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setGuest({
        id: "guest",
        title: "",
        guest_name: "Distinguished Guest",
        invitation_type: "Single",
        seats: 1,
        rsvp_status: "Pending",
        attending_count: 0,
      });
      setIsLoading(false);
    }
  }, [guestId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8E3DA]">
        <div className="text-center">
          <div className="w-9 h-9 border-2 border-[#C59E47] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-body text-xs font-semibold tracking-wider text-[#997327] uppercase">
            Preparing your invitation...
          </p>
        </div>
      </div>
    );
  }

  return <WeddingInvitationCard guest={guest} />;
}
