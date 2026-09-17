"use client";

import React from "react";
import { Users, CheckCircle, XCircle, Clock, Armchair } from "lucide-react";
import { Guest } from "@/types";

interface StatsCardsProps {
  guests: Guest[];
}

export default function StatsCards({ guests }: StatsCardsProps) {
  const totalInvited = guests.length;
  const attendingList = guests.filter((g) => g.rsvp_status === "Attending");
  const attendingGuests = attendingList.length;
  const attendingSeatsTotal = attendingList.reduce(
    (sum, g) => sum + (g.attending_count && g.attending_count > 0 ? g.attending_count : g.seats || 1),
    0
  );
  const declinedGuests = guests.filter((g) => g.rsvp_status === "Declined").length;
  const pendingGuests = guests.filter((g) => g.rsvp_status === "Pending" || !g.rsvp_status).length;
  const totalSeatsAllocated = guests.reduce((sum, g) => sum + (Number(g.seats) || 1), 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
      {/* Total Invited */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Total Invites
          </span>
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            {totalInvited}
          </span>
          <span className="block text-[11px] text-neutral-400 mt-0.5">
            Invited parties
          </span>
        </div>
      </div>

      {/* Attending */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Attending
          </span>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-900">
            {attendingGuests}
          </span>
          <span className="block text-[11px] text-emerald-700/80 mt-0.5">
            {attendingSeatsTotal} confirmed seats
          </span>
        </div>
      </div>

      {/* Pending */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Pending
          </span>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">
            {pendingGuests}
          </span>
          <span className="block text-[11px] text-amber-700/80 mt-0.5">
            Awaiting response
          </span>
        </div>
      </div>

      {/* Declined */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">
            Declined
          </span>
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
            <XCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-900">
            {declinedGuests}
          </span>
          <span className="block text-[11px] text-rose-700/80 mt-0.5">
            Cannot attend
          </span>
        </div>
      </div>

      {/* Total Seats */}
      <div className="col-span-2 lg:col-span-1 rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 to-white p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gold-900 uppercase tracking-wider">
            Total Seats
          </span>
          <div className="p-2 rounded-xl bg-gold-100 text-gold-800">
            <Armchair className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-900">
            {totalSeatsAllocated}
          </span>
          <span className="block text-[11px] text-gold-700 mt-0.5">
            Max hall capacity
          </span>
        </div>
      </div>
    </div>
  );
}
