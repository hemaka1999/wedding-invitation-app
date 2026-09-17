"use client";

import React, { useState } from "react";
import { Mail, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { Guest } from "@/types";

interface EnvelopeCoverProps {
  guest: Guest | null;
  onOpen: () => void;
}

export default function EnvelopeCover({ guest, onOpen }: EnvelopeCoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Trigger celebratory golden confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#D4AF37", "#C5A059", "#FAF8F5", "#E6CA65", "#FFFFFF"],
      });
    } catch (e) {}

    setTimeout(() => {
      onOpen();
    }, 800);
  };

  const guestDisplayName = guest
    ? `${guest.title ? guest.title + " " : ""}${guest.guest_name}`
    : "Distinguished Guest";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0F172A] via-[#1A2433] to-[#0B1120] p-4 transition-all duration-1000 ${
        isOpen ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle luxury glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.18)_0,transparent_70%)] pointer-events-none" />

      {/* Main Envelope Container */}
      <div className="relative w-full max-w-md mx-auto">
        {/* Decorative Outer Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-400/40 via-gold-200/25 to-gold-500/40 blur-xl opacity-80 animate-pulse-slow" />

        {/* Card Body */}
        <div className="relative overflow-hidden rounded-2xl border border-gold-400/40 bg-gradient-to-b from-[#1E293B] to-[#0F172A] p-7 sm:p-9 text-center shadow-2xl backdrop-blur-md">
          
          {/* Top Header Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1 text-xs uppercase tracking-widest text-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Wedding Invitation</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>

          {/* Monogram */}
          <div className="my-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
              Kasun & Nethmi
            </h1>
            <p className="mt-1 font-script text-2xl sm:text-3xl text-gold-300">
              Together Forever
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400/60" />
            <Heart className="w-4 h-4 fill-gold-400 text-gold-400" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>

          {/* Personalized Guest Badge */}
          <div className="my-6 rounded-xl border border-gold-500/25 bg-gold-950/40 p-4">
            <p className="text-[11px] uppercase tracking-wider text-gold-300/80 mb-1">
              Specially Invited
            </p>
            <p className="font-serif text-lg sm:text-xl font-medium text-ivory-100">
              {guestDisplayName}
            </p>
            {guest?.invitation_type && (
              <span className="inline-block mt-2 text-xs px-3 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">
                {guest.invitation_type === "Custom"
                  ? guest.custom_text || "Special Guest"
                  : `${guest.invitation_type} Invitation (${guest.seats || 1} ${(guest.seats || 1) > 1 ? "Seats" : "Seat"})`}
              </span>
            )}
          </div>

          {/* Wax Seal Action Button */}
          <div className="mt-7 flex flex-col items-center">
            <button
              onClick={handleOpen}
              id="btn-open-invitation"
              className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-[0_0_30px_rgba(197,160,89,0.5)] border-2 border-gold-200 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center text-royal-900">
                <span className="font-serif font-bold text-xs tracking-tighter">K & N</span>
                <Mail className="w-5 h-5 text-royal-900 mt-0.5 group-hover:scale-110 transition-transform" />
              </div>
            </button>

            <p className="mt-4 text-xs font-medium tracking-widest text-gold-300/90 uppercase animate-bounce">
              Tap Wax Seal to Open
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
