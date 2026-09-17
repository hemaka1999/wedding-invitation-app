"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Send, Heart, Sparkles, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Guest, RsvpStatus } from "@/types";
import { apiService } from "@/services/apiService";

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
          origin: { y: 0.7 },
          colors: ["#D4AF37", "#C5A059", "#10B981", "#E6CA65"],
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
    <section className="my-12 px-4 max-w-xl mx-auto">
      <div className="rounded-2xl border border-gold-300/80 bg-gradient-to-b from-white to-ivory-50 p-6 sm:p-8 shadow-md">
        
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
            Response Requested
          </span>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-royal-900 font-semibold">
            Will You Attend?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Please respond by 1st October 2026 to help us finalize arrangements.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-royal-900">
              Thank You for Your Response!
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {status === "Attending"
                ? `We are delighted that you (${attendingCount} ${attendingCount > 1 ? "guests" : "guest"}) will be joining us on our special day!`
                : "Thank you for letting us know. We will miss your presence!"}
            </p>
            {wishes && (
              <div className="mt-4 p-3.5 rounded-xl bg-gold-50/60 border border-gold-200 text-xs italic text-neutral-700">
                "{wishes}"
              </div>
            )}
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-xs text-gold-700 underline font-medium hover:text-gold-800"
            >
              Update Your Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("Attending")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  status === "Attending"
                    ? "border-emerald-500 bg-emerald-50/70 text-emerald-900 shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                }`}
              >
                <CheckCircle2
                  className={`w-6 h-6 mb-1 ${
                    status === "Attending" ? "text-emerald-600" : "text-neutral-400"
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold">Joyfully Accept</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("Declined")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  status === "Declined"
                    ? "border-rose-400 bg-rose-50/70 text-rose-900 shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                }`}
              >
                <XCircle
                  className={`w-6 h-6 mb-1 ${
                    status === "Declined" ? "text-rose-500" : "text-neutral-400"
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold">Regretfully Decline</span>
              </button>
            </div>

            {/* Number of Attending Guests (Only if Attending) */}
            {status === "Attending" && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-700">
                  Number of Attending Guests (Max {maxSeats}):
                </label>
                <div className="flex items-center gap-3">
                  {[...Array(maxSeats)].map((_, i) => {
                    const count = i + 1;
                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setAttendingCount(count)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                          attendingCount === count
                            ? "border-gold-500 bg-gold-50 text-gold-900 font-bold shadow-sm"
                            : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {count} {count === 1 ? "Person" : "People"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Wishes & Dietary Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">
                Wishes & Blessing Message for the Couple (Optional):
              </label>
              <textarea
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="Write your wishes or any special dietary requirements..."
                rows={3}
                className="w-full rounded-xl border border-neutral-300 p-3 text-xs sm:text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 py-3.5 text-sm font-semibold text-white shadow-md hover:from-gold-600 hover:to-gold-700 disabled:opacity-50 transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting RSVP...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send RSVP Confirmation</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
