import React from "react";
import { HeartHandshake } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8E3DA] p-4 text-center">
      <div className="max-w-md w-full rounded-[24px] border border-[#EFE4CF] bg-white p-8 sm:p-10 shadow-[0_16px_40px_rgba(10,14,23,0.12)]">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF4E8] border border-[#C59E47]/50 text-[#997327] mb-4 shadow-xs">
          <HeartHandshake className="w-7 h-7 text-[#997327]" />
        </div>
        <span className="block font-body text-[10px] font-bold uppercase tracking-[2.5px] text-[#997327] mb-1">
          404 • Not Found
        </span>
        <h1 className="font-title text-2xl font-bold text-[#0F172A] mb-2">
          Invitation Not Found
        </h1>
        <p className="font-body text-xs text-[#696155] mb-2 leading-relaxed">
          We couldn&apos;t find an active wedding invitation for this link.
        </p>
        <p className="font-body text-[11px] text-[#80786C] leading-relaxed">
          Please check the invitation URL or contact Kasun &amp; Nethmi directly.
        </p>
      </div>
    </div>
  );
}
