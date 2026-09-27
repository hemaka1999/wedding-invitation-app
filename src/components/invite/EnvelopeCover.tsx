"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Guest } from "@/types";
import { weddingConfig } from "@/config/weddingConfig";

interface EnvelopeCoverProps {
  guest: Guest | null;
  onOpen: () => void;
}

export default function EnvelopeCover({ guest, onOpen }: EnvelopeCoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSealing, setIsSealing] = useState(false);

  const { groom, bride, subtitles } = weddingConfig;
  const coupleHeader = `${groom.callName.toUpperCase()} & ${bride.callName.toUpperCase()}`;
  const monogramInitials = `${groom.callName.charAt(0)} & ${bride.callName.charAt(0)}`;

  // Lock body scroll while cover screen is active to prevent underlying page from scrolling
  useEffect(() => {
    if (!isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
        document.body.style.touchAction = "";
      };
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (isSealing || isOpen) return;
    setIsSealing(true);

    // Trigger celebratory golden & champagne confetti
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.62 },
        colors: ["#FCEFD2", "#E5C77A", "#C59E47", "#FFFFFF", "#DEB553"],
      });
    } catch (e) {}

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 700);
    }, 450);
  };

  const guestDisplayName = guest
    ? `${guest.title ? guest.title + " " : ""}${guest.guest_name}`
    : "Distinguished Guest";

  const getSeatText = () => {
    if (!guest) return "Cordially Invited";
    if (guest.invitation_type === "Custom") {
      return `${guest.custom_text || "Special Invitation"} (${guest.seats || 1} ${(guest.seats || 1) > 1 ? "Seats" : "Seat"})`;
    }
    if (guest.invitation_type === "Couple") {
      return "Couple Invitation (2 Seats)";
    }
    if (guest.invitation_type === "Family") {
      return `Family Invitation (${guest.seats || 4} Seats)`;
    }
    return `Single Invitation (${guest.seats || 1} Seat)`;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070C16] sm:bg-[#E8E3DA] p-3 sm:p-4 overflow-hidden touch-none transition-all duration-700 ${
        isOpen ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Mobile Chassis Frame Container */}
      <div className="relative w-full max-w-[390px] max-h-[94dvh] overflow-hidden rounded-[32px] sm:rounded-[36px] bg-[#070C16] p-3 sm:p-4 shadow-[0_20px_50px_rgba(10,14,23,0.7)] border-[1.5px] border-[#22304A]">
        
        {/* Inner Card Container with Midnight Navy Gradient & Gold Border */}
        <div className="relative rounded-[24px] sm:rounded-[26px] bg-dark-envelope p-5 sm:p-7 text-center border border-[#C59E47]/40 overflow-hidden shadow-2xl">
          
          {/* Delicate Corner Filigree Ornaments */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 346 734"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="corner-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCEFD2" />
                <stop offset="50%" stopColor="#C59E47" />
                <stop offset="100%" stopColor="#E5C77A" />
              </linearGradient>
            </defs>
            {/* Top Left */}
            <path
              d="M 18 30 C 18 18 30 18 30 18 M 18 30 C 18 42 30 42 30 42"
              stroke="url(#corner-gold)"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Top Right */}
            <path
              d="M 328 30 C 328 18 316 18 316 18 M 328 30 C 328 42 316 42 316 42"
              stroke="url(#corner-gold)"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Bottom Left */}
            <path
              d="M 18 704 C 18 716 30 716 30 716 M 18 704 C 18 692 30 692 30 692"
              stroke="url(#corner-gold)"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Bottom Right */}
            <path
              d="M 328 704 C 328 716 316 716 316 716 M 328 704 C 328 692 316 692 316 692"
              stroke="url(#corner-gold)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>

          {/* Header Badge */}
          <div className="relative z-10 mx-auto inline-flex items-center justify-center rounded-full bg-[#141E32] px-4 sm:px-5 py-1 sm:py-1.5 border border-[#C59E47]/60 shadow-sm mt-1">
            <span className="font-body text-[9px] sm:text-[11px] font-semibold tracking-[2.5px] sm:tracking-[3px] text-[#E5C77A] uppercase">
              ✦ WEDDING INVITATION ✦
            </span>
          </div>

          {/* Couple Names & Subtitle */}
          <div className="relative z-10 mt-4 sm:mt-7">
            <h1 className="font-title text-2xl sm:text-3xl font-bold tracking-[2px] sm:tracking-[2.5px] text-white">
              {coupleHeader}
            </h1>
            <p className="font-script italic text-lg sm:text-2xl text-[#E5C77A] mt-0.5 sm:mt-1 font-normal">
              {subtitles.coverSubtitle}
            </p>
          </div>

          {/* Heart Divider */}
          <div className="relative z-10 flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent to-[#C59E47]/70" />
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5C77A] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-l from-transparent to-[#C59E47]/70" />
          </div>

          {/* Guest Personalization Tile */}
          <div className="relative z-10 my-4 sm:my-6 rounded-2xl border border-[#253552] bg-[#0E1626] p-3.5 sm:p-5 shadow-inner">
            <p className="font-body text-[8.5px] sm:text-[9px] font-semibold tracking-[2.5px] sm:tracking-[2.8px] text-[#8E9EB8] uppercase">
              SPECIALLY INVITED
            </p>
            <h2 className="font-title text-lg sm:text-2xl font-semibold tracking-[1.5px] text-white mt-1 uppercase">
              {guestDisplayName}
            </h2>

            {/* Seat Badge Pill */}
            <div className="mt-2.5 sm:mt-3 inline-block rounded-full bg-[#18243A] px-3.5 sm:px-4 py-0.5 sm:py-1 border border-[#C59E47]/50 shadow-sm">
              <span className="font-body text-[10px] sm:text-[11px] font-medium text-[#E5C77A]">
                {getSeatText()}
              </span>
            </div>
          </div>

          {/* Animated 3D Wax Seal Centerpiece */}
          <div className="relative z-10 mt-5 sm:mt-8 flex flex-col items-center">
            <div
              id="btn-open-invitation"
              onClick={handleOpen}
              className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 cursor-pointer transition-transform duration-300 active:scale-95"
            >
              {/* Outer Pulsing Aura Rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#E5C77A]/50 animate-seal-aura" />
              <div className="absolute -inset-2 rounded-full border border-[#E5C77A]/40 animate-seal-pulse" />

              {/* 3D Wax Seal Coin */}
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full wax-seal-gradient shadow-[0_8px_25px_rgba(212,175,55,0.45)] border border-[#FFE5A3]/60 group-hover:scale-105 transition-transform duration-300">
                {/* Inner Ring Groove */}
                <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-[#4F3503]/40 flex flex-col items-center justify-center">
                  <span className="font-title font-bold text-[11px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] text-[#382402] select-none">
                    {monogramInitials}
                  </span>
                  
                  {/* Embossed Envelope Icon */}
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#382402] mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Prompt Text */}
            <p className="font-body text-[10px] sm:text-[11px] font-bold tracking-[2.5px] text-[#E5C77A] uppercase mt-3 sm:mt-4 animate-pulse">
              TAP WAX SEAL TO OPEN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
