"use client";

import React, { useState } from "react";
import { Lock, KeyRound, AlertCircle, Sparkles } from "lucide-react";
import { authConfig } from "@/config/authConfig";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === authConfig.adminPassword) {
      sessionStorage.setItem(authConfig.sessionKey, "authenticated");
      onLoginSuccess();
    } else {
      setError("Incorrect password. Please enter the 8-character password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-900 via-[#1A2433] to-[#0F172A] p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gold-400/30 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/30 mb-4">
              <KeyRound className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Admin Access
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Kasun & Nethmi Wedding Guest Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gold-300 uppercase tracking-wider mb-2">
                Security Password (8 Characters)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password..."
                  required
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900/80 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
                <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 py-3 text-sm font-semibold text-royal-900 shadow-lg hover:from-gold-300 hover:to-gold-500 transition-all duration-200"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-center text-[11px] text-neutral-500 mt-6">
            Default Password: <span className="text-gold-400 font-mono">Wed2026!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
