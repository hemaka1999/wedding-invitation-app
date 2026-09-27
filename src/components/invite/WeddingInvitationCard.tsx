"use client";

import React, { useState } from "react";
import { Guest } from "@/types";
import { weddingConfig } from "@/config/weddingConfig";
import EnvelopeCover from "./EnvelopeCover";
import PersonalizedGreeting from "./PersonalizedGreeting";
import CoupleIntroduction from "./CoupleIntroduction";
import CountdownTimer from "./CountdownTimer";
import EventSchedule from "./EventSchedule";
import VenueMap from "./VenueMap";
import RsvpForm from "./RsvpForm";
import MusicPlayer from "./MusicPlayer";
import ThreeFloatingDust from "./ThreeFloatingDust";

interface WeddingInvitationCardProps {
  guest: Guest | null;
}

export default function WeddingInvitationCard({ guest }: WeddingInvitationCardProps) {
  const [isOpened, setIsOpened] = useState(false);
  const { groom, bride, subtitles, date, venue } = weddingConfig;
  const coupleNames = `${groom.callName.toUpperCase()} & ${bride.callName.toUpperCase()}`;

  return (
    <main className="relative min-h-screen bg-[#E8E3DA] py-6 sm:py-12 px-3 sm:px-4 selection:bg-[#E5C77A]/30">
      {/* Ambient 3D Floating Golden Stardust Canvas */}
      <ThreeFloatingDust />

      {/* Floating Music Player */}
      <MusicPlayer autoPlayTrigger={isOpened} />

      {/* Interactive Gated Cover Screen (Screen 1) */}
      {!isOpened && (
        <EnvelopeCover guest={guest} onOpen={() => setIsOpened(true)} />
      )}

      {/* Main Wedding Invitation Chassis Container (Screen 2) */}
      <div className="relative z-10 mx-auto max-w-[430px] rounded-[36px] bg-[#FAF6EE] p-4 sm:p-6 shadow-[0_16px_40px_rgba(10,14,23,0.12)] border-[1.5px] border-[#E6DDD0]">
        
        {/* Header Poruwa Monogram */}
        <div className="pt-4 pb-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-[#C59E47]/70" />
            <span className="font-body text-[9px] sm:text-[10px] font-bold tracking-[2.8px] text-[#997327] uppercase">
              ✦ {subtitles.poruwaBadge} ✦
            </span>
            <div className="h-[1px] w-12 bg-[#C59E47]/70" />
          </div>

          {/* Couple Heading */}
          <h1 className="font-title text-3xl sm:text-4xl font-bold tracking-[2px] text-[#0F172A] mt-4">
            {coupleNames}
          </h1>
          <p className="font-script italic text-2xl sm:text-3xl text-[#A88232] mt-1 font-normal">
            {subtitles.mainSubtitle}
          </p>
        </div>

        {/* Card 1: Warm Welcome & Guest Designation */}
        <PersonalizedGreeting guest={guest} />

        {/* Poruwa Blessing Quote & Card 2: Parents Lineage */}
        <CoupleIntroduction />

        {/* Card 3: Date & Royal Navy Countdown Block */}
        <CountdownTimer />

        {/* Card 4: Auspicious Poruwa & Events Timeline */}
        <EventSchedule />

        {/* Card 5: Venue & Directions Card */}
        <VenueMap />

        {/* Card 6: Response Requested RSVP */}
        <RsvpForm guest={guest} />

        {/* Footer Info */}
        <footer className="mt-10 mb-2 pt-6 border-t border-[#EAE0D0] text-center">
          <h4 className="font-title text-base font-bold text-[#0F172A] tracking-wider">
            {coupleNames}
          </h4>
          <p className="font-body text-[11px] text-[#80786C] mt-1">
            {date.displayDate} • {venue.name}, {venue.city}
          </p>
        </footer>
      </div>
    </main>
  );
}
