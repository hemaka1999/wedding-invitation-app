"use client";

import React, { useState, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay prevented:", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={weddingConfig.music.audioUrl}
        loop
        preload="auto"
      />

      {/* Floating Interactive Button Matching SVG Ambience Toggle */}
      <button
        onClick={toggleMusic}
        id="btn-music-toggle"
        aria-label="Toggle Background Music"
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full border border-[#C59E47] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ${
          isPlaying
            ? "bg-[#141E32] text-[#E5C77A] ring-2 ring-[#E5C77A]/40"
            : "bg-[#0B1220]/90 text-[#E5C77A]/80 hover:bg-[#141E32] hover:text-[#E5C77A]"
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-[#E5C77A] animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C77A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5C77A]"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-[#E5C77A]/80 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}
