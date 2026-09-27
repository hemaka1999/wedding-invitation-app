"use client";

import React from "react";
import { User, Users, HeartHandshake, Sparkles } from "lucide-react";
import { Guest } from "@/types";
import ThreeSketchShimmer from "./ThreeSketchShimmer";

interface PersonalizedGreetingProps {
  guest: Guest | null;
}

export default function PersonalizedGreeting({ guest }: PersonalizedGreetingProps) {
  const guestDisplayName = guest
    ? `${guest.title ? guest.title + " " : ""}${guest.guest_name}`
    : "Distinguished Guest";

  const renderBadge = () => {
    if (!guest) {
      return (
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FBF7EE] text-[#8F6B21] border border-[#E5CE9F] text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#A88232]" />
          Cordially Invited • Blessing Requested
        </span>
      );
    }

    switch (guest.invitation_type) {
      case "Single":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FBF7EE] text-[#8F6B21] border border-[#E5CE9F] text-xs font-semibold shadow-xs">
            <User className="w-3.5 h-3.5 text-[#A88232]" />
            Individual Invitation • 1 Seat Reserved
          </span>
        );
      case "Couple":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FBF7EE] text-[#8F6B21] border border-[#E5CE9F] text-xs font-semibold shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-[#A88232]" />
            Couple Invitation • 2 Seats Reserved
          </span>
        );
      case "Family":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FBF7EE] text-[#8F6B21] border border-[#E5CE9F] text-xs font-semibold shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#A88232]" />
            Family Invitation • {guest.seats || 4} Seats Reserved
          </span>
        );
      case "Custom":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FBF7EE] text-[#8F6B21] border border-[#E5CE9F] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A88232]" />
            {guest.custom_text || "Special Invitation"} • {guest.seats || 1} {guest.seats > 1 ? "Seats" : "Seat"} Reserved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative my-5 overflow-hidden rounded-[20px] border border-[#EFE4CF] bg-white p-5 sm:p-6 text-center shadow-[0_8px_24px_rgba(122,104,67,0.08)]">
      {/* 3D Gold Foil Shimmer Shader for Rings & Petals */}
      <ThreeSketchShimmer
        imageSrc="/images/rings_sketch.jpg"
        opacity={0.22}
        goldIntensity={1.2}
      />

      {/* Card Content (z-10) */}
      <div className="relative z-10">
        {/* Eyebrow */}
        <p className="font-body text-[10px] sm:text-[11px] font-bold tracking-[2.5px] text-[#A88232] uppercase">
          WE WARMLY WELCOME &amp; INVITE
        </p>

        {/* Guest Name */}
        <h2 className="font-title text-2xl sm:text-[26px] font-bold tracking-[1px] text-[#0F172A] mt-1.5 uppercase">
          {guestDisplayName}
        </h2>

        {/* Reserved Tag */}
        <div className="mt-3 flex justify-center">
          {renderBadge()}
        </div>

        {/* Invitation Blessing Subtext */}
        <p className="font-script italic text-sm sm:text-[15px] text-[#5F574C] mt-3 leading-relaxed">
          Your esteemed presence and blessings are wholeheartedly requested.
        </p>
      </div>
    </section>
  );
}
