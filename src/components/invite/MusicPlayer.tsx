"use client";

import React, { useState, useRef, useEffect } from "react";
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
    <div className="fixed bottom-5 right-5 z-40">
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={weddingConfig.music.audioUrl}
        loop
        preload="auto"
      />

      {/* Floating Interactive Button */}
      <button
        onClick={toggleMusic}
        aria-label="Toggle Background Music"
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-gold-300 shadow-xl transition-all duration-300 ${
          isPlaying
            ? "bg-gradient-to-tr from-gold-500 to-gold-400 text-royal-900 animate-spin"
            : "bg-royal-900/90 text-gold-300 backdrop-blur-md"
        }`}
        style={{ animationDuration: "10s" }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-royal-900" />
        ) : (
          <VolumeX className="w-5 h-5 text-gold-300" />
        )}
      </button>
    </div>
  );
}
