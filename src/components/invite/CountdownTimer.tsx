"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, Plus } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const { date } = weddingConfig;
  const targetDate = new Date(date.isoDateTime).getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleAddToCalendar = () => {
    const { calendarEvent } = date;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      calendarEvent.title
    )}&details=${encodeURIComponent(
      calendarEvent.description
    )}&location=${encodeURIComponent(
      calendarEvent.location
    )}&dates=${calendarEvent.startDate}/${calendarEvent.endDate}`;
    
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="my-10 max-w-lg mx-auto px-4">
      <div className="rounded-2xl border border-gold-300 bg-gradient-to-br from-[#1A2433] to-[#0F172A] p-6 sm:p-8 text-center text-white shadow-xl">
        
        {/* Date Header */}
        <div className="flex items-center justify-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-2">
          <Calendar className="w-4 h-4 text-gold-400" />
          <span>{date.displayDate}</span>
        </div>

        <p className="text-ivory-300 text-xs sm:text-sm mb-6">
          {date.timeDisplay}
        </p>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
          <div className="rounded-xl border border-gold-400/30 bg-gold-950/40 p-3 sm:p-4">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
              {timeLeft.days}
            </span>
            <span className="block text-[10px] sm:text-xs text-gold-200/70 uppercase mt-1 tracking-wider">
              Days
            </span>
          </div>

          <div className="rounded-xl border border-gold-400/30 bg-gold-950/40 p-3 sm:p-4">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
              {timeLeft.hours}
            </span>
            <span className="block text-[10px] sm:text-xs text-gold-200/70 uppercase mt-1 tracking-wider">
              Hours
            </span>
          </div>

          <div className="rounded-xl border border-gold-400/30 bg-gold-950/40 p-3 sm:p-4">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
              {timeLeft.minutes}
            </span>
            <span className="block text-[10px] sm:text-xs text-gold-200/70 uppercase mt-1 tracking-wider">
              Mins
            </span>
          </div>

          <div className="rounded-xl border border-gold-400/30 bg-gold-950/40 p-3 sm:p-4">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-300">
              {timeLeft.seconds}
            </span>
            <span className="block text-[10px] sm:text-xs text-gold-200/70 uppercase mt-1 tracking-wider">
              Secs
            </span>
          </div>
        </div>

        {/* Add to Calendar Button */}
        <button
          onClick={handleAddToCalendar}
          className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/15 px-5 py-2 text-xs font-medium text-gold-200 hover:bg-gold-400/25 hover:text-white transition-all duration-200 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-gold-400" />
          <span>Add to Google Calendar</span>
        </button>
      </div>
    </div>
  );
}
