"use client";

import React from "react";
import { Users, User, HeartHandshake, Sparkles } from "lucide-react";
import { Guest } from "@/types";

interface PersonalizedGreetingProps {
  guest: Guest | null;
}

export default function PersonalizedGreeting({ guest }: PersonalizedGreetingProps) {
  if (!guest) {
    return (
      <div className="text-center py-6 px-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 text-gold-700 text-xs font-medium uppercase tracking-wider border border-gold-400/20">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          Cordially Invited
        </span>
        <h2 className="mt-3 font-serif text-2xl sm:text-3xl text-royal-900 font-normal">
          Dear Beloved Family & Friends
        </h2>
      </div>
    );
  }

  const titlePrefix = guest.title ? `${guest.title} ` : "";
  const fullName = `${titlePrefix}${guest.guest_name}`;

  const renderBadge = () => {
    switch (guest.invitation_type) {
      case "Single":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium">
            <User className="w-3.5 h-3.5 text-amber-600" />
            Individual Invitation • 1 Seat Reserved
          </span>
        );
      case "Couple":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-xs font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
            Couple Invitation • 2 Seats Reserved
          </span>
        );
      case "Family":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            Family Invitation • {guest.seats || 4} Seats Reserved
          </span>
        );
      case "Custom":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-50 text-gold-900 border border-gold-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            {guest.custom_text || "Special Invitation"} • {guest.seats || 1} {guest.seats > 1 ? "Seats" : "Seat"} Reserved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative my-8 mx-auto max-w-lg overflow-hidden rounded-2xl border border-gold-200/80 bg-gradient-to-b from-ivory-50 to-ivory-200/90 p-6 sm:p-8 text-center shadow-lg">
      {/* Decorative Gold Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

      <p className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold mb-2">
        We Warmly Welcome & Invite
      </p>

      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-royal-900 tracking-tight">
        {fullName}
      </h2>

      <div className="mt-4 flex justify-center">
        {renderBadge()}
      </div>

      <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
        Your esteemed presence and blessings are wholeheartedly requested as we celebrate our holy matrimony.
      </p>
    </div>
  );
}
