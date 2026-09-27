"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
    <section className="my-6 rounded-[20px] bg-[#0D1627] p-5 sm:p-6 text-center shadow-[0_8px_24px_rgba(122,104,67,0.08)] border border-[#1E2F4D]">
      {/* Date Header */}
      <p className="font-body text-[11px] sm:text-xs font-bold tracking-[2px] text-[#E5C77A] uppercase">
        📅 {date.displayDate.toUpperCase()}
      </p>
      <p className="font-body text-[11px] text-[#8FA4C5] mt-1">
        {date.timeDisplay}
      </p>

      {/* 4 Segment Counters */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 my-5">
        {/* Days */}
        <div className="rounded-[12px] bg-[#16233B] border border-[#C59E47]/70 py-2.5 px-1 sm:px-2 shadow-inner">
          <span className="font-title text-xl sm:text-2xl font-bold text-white block">
            {timeLeft.days}
          </span>
          <span className="font-body text-[8px] sm:text-[9px] font-semibold text-[#8FA4C5] tracking-wider uppercase block mt-0.5">
            DAYS
          </span>
        </div>

        {/* Hours */}
        <div className="rounded-[12px] bg-[#16233B] border border-[#C59E47]/70 py-2.5 px-1 sm:px-2 shadow-inner">
          <span className="font-title text-xl sm:text-2xl font-bold text-white block">
            {timeLeft.hours}
          </span>
          <span className="font-body text-[8px] sm:text-[9px] font-semibold text-[#8FA4C5] tracking-wider uppercase block mt-0.5">
            HOURS
          </span>
        </div>

        {/* Mins */}
        <div className="rounded-[12px] bg-[#16233B] border border-[#C59E47]/70 py-2.5 px-1 sm:px-2 shadow-inner">
          <span className="font-title text-xl sm:text-2xl font-bold text-white block">
            {timeLeft.minutes}
          </span>
          <span className="font-body text-[8px] sm:text-[9px] font-semibold text-[#8FA4C5] tracking-wider uppercase block mt-0.5">
            MINS
          </span>
        </div>

        {/* Secs */}
        <div className="rounded-[12px] bg-[#16233B] border border-[#C59E47]/70 py-2.5 px-1 sm:px-2 shadow-inner">
          <span className="font-title text-xl sm:text-2xl font-bold text-white block">
            {timeLeft.seconds}
          </span>
          <span className="font-body text-[8px] sm:text-[9px] font-semibold text-[#8FA4C5] tracking-wider uppercase block mt-0.5">
            SECS
          </span>
        </div>
      </div>

      {/* Add to Google Calendar Action */}
      <button
        onClick={handleAddToCalendar}
        id="btn-add-calendar"
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1E2F4D] px-6 py-2 text-[11px] sm:text-xs font-semibold text-white hover:bg-[#25395c] transition-colors shadow-sm"
      >
        <Plus className="w-3.5 h-3.5 text-[#E5C77A]" />
        <span>+ Add to Google Calendar</span>
      </button>
    </section>
  );
}
