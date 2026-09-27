"use client";

import React, { useState } from "react";
import { Check, Send, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Guest, RsvpStatus } from "@/types";
import { apiService } from "@/services/apiService";
import ThreeSketchShimmer from "./ThreeSketchShimmer";

interface RsvpFormProps {
  guest: Guest | null;
  onRsvpSuccess?: () => void;
}

export default function RsvpForm({ guest, onRsvpSuccess }: RsvpFormProps) {
  const maxSeats = guest?.seats || 2;
  const [status, setStatus] = useState<RsvpStatus>(
    guest?.rsvp_status === "Attending" || guest?.rsvp_status === "Declined"
      ? guest.rsvp_status
      : "Attending"
  );
  const [attendingCount, setAttendingCount] = useState<number>(
    guest?.attending_count && guest.attending_count > 0 ? guest.attending_count : Math.min(1, maxSeats)
  );
  const [wishes, setWishes] = useState<string>(guest?.wishes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(
    guest?.rsvp_status === "Attending" || guest?.rsvp_status === "Declined"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest) return;

    setIsSubmitting(true);
    try {
      const finalCount = status === "Attending" ? attendingCount : 0;
      await apiService.submitRsvp(guest.id, status, finalCount, wishes);

      setIsSubmitted(true);

      if (status === "Attending") {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.75 },
          colors: ["#FCEFD2", "#E5C77A", "#C59E47", "#10B981", "#DEB553"],
        });
      }

      if (onRsvpSuccess) {
        onRsvpSuccess();
      }
    } catch (err) {
      console.error("Failed to submit RSVP:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="my-8">
      <div className="relative overflow-hidden rounded-[20px] border border-[#EFE4CF] bg-white p-5 sm:p-6 text-center shadow-[0_8px_24px_rgba(122,104,67,0.08)]">
        
        {/* 3D Gold Foil Shimmer Shader for Holding Hands Sketch */}
        <ThreeSketchShimmer
          imageSrc="/images/rsvp_hands_sketch.jpg"
          opacity={0.24}
          goldIntensity={1.3}
        />

        {/* Card Content (z-10) */}
        <div className="relative z-10">
          {/* Header */}
          <span className="font-body text-[10px] sm:text-[11px] font-bold tracking-[2.8px] text-[#997327] uppercase">
            RESPONSE REQUESTED
          </span>
          <h2 className="font-title text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
            WILL YOU ATTEND?
          </h2>
          <p className="font-body text-[11px] sm:text-xs text-[#696155] mt-1">
            Please respond by 1st October 2026 to help us finalize arrangements.
          </p>

          {isSubmitted ? (
            <div className="mt-5 py-3">
              {/* Green Confirmation Pill */}
              <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#EDF7ED] border border-[#4CAF50] mb-3 shadow-xs">
                <Check className="w-5 h-5 text-[#2E7D32] stroke-[2.5]" />
              </div>

              <p className="font-body text-xs sm:text-[13px] font-bold text-[#0F172A]">
                {status === "Attending"
                  ? `We are delighted that you (${attendingCount} ${attendingCount > 1 ? "guests" : "guest"}) will join us!`
                  : "Thank you for letting us know. You will be dearly missed!"}
              </p>

              {wishes && (
                <div className="mt-3 p-3 rounded-[12px] bg-[#FAF6EE] border border-[#EFE4CF] text-[11px] italic text-[#696155]">
                  &ldquo;{wishes}&rdquo;
                </div>
              )}

              <button
                onClick={() => setIsSubmitted(false)}
                id="btn-update-rsvp"
                className="mt-4 font-body text-[11px] font-semibold underline text-[#997327] hover:text-[#7A5817] cursor-pointer"
              >
                Update Your Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left">
              {/* Status Options */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setStatus("Attending")}
                  className={`py-3 px-2 rounded-[14px] border text-center transition-all ${
                    status === "Attending"
                      ? "border-[#4CAF50] bg-[#EDF7ED] text-[#2E7D32] font-bold shadow-xs"
                      : "border-[#EAE0D0] bg-[#FAF6EE]/60 text-[#696155] hover:border-[#DEC89E]"
                  }`}
                >
                  <span className="font-body text-xs sm:text-[13px] block">
                    ✓ Joyfully Accept
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("Declined")}
                  className={`py-3 px-2 rounded-[14px] border text-center transition-all ${
                    status === "Declined"
                      ? "border-[#E57373] bg-[#FFEBEE] text-[#C62828] font-bold shadow-xs"
                      : "border-[#EAE0D0] bg-[#FAF6EE]/60 text-[#696155] hover:border-[#DEC89E]"
                  }`}
                >
                  <span className="font-body text-xs sm:text-[13px] block">
                    ✕ Regretfully Decline
                  </span>
                </button>
              </div>

              {/* Number of Attending Guests (Only if Attending) */}
              {status === "Attending" && (
                <div>
                  <label className="block font-body text-[11px] font-semibold text-[#0F172A] mb-1.5">
                    Number of Attending Guests (Max {maxSeats}):
                  </label>
                  <div className="flex items-center gap-2">
                    {[...Array(maxSeats)].map((_, i) => {
                      const count = i + 1;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setAttendingCount(count)}
                          className={`flex-1 py-2 rounded-[10px] border text-xs font-semibold transition-all ${
                            attendingCount === count
                              ? "border-[#C59E47] bg-[#FAF4E8] text-[#997327] font-bold shadow-xs"
                              : "border-[#EAE0D0] bg-white text-[#696155] hover:border-[#DEC89E]"
                          }`}
                        >
                          {count} {count === 1 ? "Guest" : "Guests"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Wishes & Dietary Notes */}
              <div>
                <label className="block font-body text-[11px] font-semibold text-[#0F172A] mb-1">
                  Wishes &amp; Blessing Message for the Couple (Optional):
                </label>
                <textarea
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Write your blessings or dietary notes..."
                  rows={2}
                  className="w-full rounded-[12px] border border-[#EAE0D0] p-2.5 font-body text-xs text-[#0F172A] focus:border-[#C59E47] focus:outline-none focus:ring-1 focus:ring-[#C59E47]"
                />
              </div>

              {/* Submit Button in Gold Foil */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="btn-submit-rsvp"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-gold-foil py-3 px-4 text-xs sm:text-[13px] font-bold text-[#3D2602] shadow-sm hover:brightness-105 active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#3D2602]" />
                    <span>Submitting RSVP...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#3D2602]" />
                    <span>Send RSVP Confirmation</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
