"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Copy,
  Check,
  MessageCircle,
  Edit,
  Trash2,
  ExternalLink,
  RefreshCw,
  LogOut,
  Sparkles,
  Link as LinkIcon,
  Users,
} from "lucide-react";
import { Guest, GuestFormData } from "@/types";
import { apiService } from "@/services/apiService";
import { authConfig } from "@/config/authConfig";
import StatsCards from "./StatsCards";
import GuestModal from "./GuestModal";
import DeleteModal from "./DeleteModal";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedRsvp, setSelectedRsvp] = useState<string>("ALL");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [deletingGuest, setDeletingGuest] = useState<Guest | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchGuests = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getAllGuests();
      setGuests(data);
    } catch (err) {
      console.error("Error fetching guests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleSaveGuest = async (formData: GuestFormData) => {
    if (editingGuest) {
      await apiService.updateGuest(formData);
    } else {
      await apiService.createGuest(formData);
    }
    await fetchGuests();
  };

  const handleDeleteConfirm = async () => {
    if (deletingGuest) {
      await apiService.deleteGuest(deletingGuest.id);
      await fetchGuests();
    }
  };

  const getInviteLink = (id: string) => {
    if (typeof window === "undefined") return `/invite/${id}`;
    return `${window.location.origin}/invite/${id}`;
  };

  const handleCopyLink = async (id: string) => {
    const link = getInviteLink(id);
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(link);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback method for HTTP / older browsers / strict clipboard policies
      try {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy link:", fallbackErr);
      }
    }
  };

  const handleSendWhatsApp = (guest: Guest) => {
    const link = getInviteLink(guest.id);
    const title = guest.title ? `${guest.title} ` : "";
    const name = `${title}${guest.guest_name}`;
    
    const message = `Dear ${name},\n\nWe warmly invite you to celebrate our wedding on Sunday, 18th October 2026 at Shangri-La Hotel, Colombo.\n\nPlease open your personalized digital invitation here:\n${link}\n\nWith love & regards,\nKasun & Nethmi`;
    
    const phoneClean = (guest.phone || "").replace(/[^0-9]/g, "");
    const waUrl = phoneClean
      ? `https://wa.me/${phoneClean}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(waUrl, "_blank");
  };

  // Filtered guest list
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.phone && g.phone.includes(searchTerm));

    const matchesType = selectedType === "ALL" || g.invitation_type === selectedType;
    const matchesRsvp = selectedRsvp === "ALL" || g.rsvp_status === selectedRsvp;

    return matchesSearch && matchesType && matchesRsvp;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-600">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>Wedding Guest Manager</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-royal-900 mt-1">
              Kasun & Nethmi's Guest List
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={fetchGuests}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => {
                setEditingGuest(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:from-gold-600 hover:to-gold-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Guest</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl border border-neutral-300 bg-white text-neutral-500 hover:bg-neutral-50 hover:text-rose-600 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <StatsCards guests={guests} />

        {/* Controls: Search & Filters */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by guest name, phone, or short ID..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50/60 pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:border-gold-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Filter by Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 focus:border-gold-500 focus:outline-none"
            >
              <option value="ALL">All Invite Types</option>
              <option value="Single">Single</option>
              <option value="Couple">Couple</option>
              <option value="Family">Family</option>
              <option value="Custom">Custom</option>
            </select>

            {/* Filter by RSVP */}
            <select
              value={selectedRsvp}
              onChange={(e) => setSelectedRsvp(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 focus:border-gold-500 focus:outline-none"
            >
              <option value="ALL">All RSVPs</option>
              <option value="Attending">Attending</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>

        {/* Guest List Table */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] uppercase tracking-wider font-semibold text-neutral-500">
                <tr>
                  <th className="px-5 py-3.5">Guest Name & Title</th>
                  <th className="px-4 py-3.5">Type & Seats</th>
                  <th className="px-4 py-3.5">RSVP Status</th>
                  <th className="px-4 py-3.5">Shareable Link</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No wedding guests found.</p>
                      <button
                        onClick={() => {
                          setEditingGuest(null);
                          setIsModalOpen(true);
                        }}
                        className="mt-3 text-xs text-gold-700 font-bold hover:underline"
                      >
                        + Add First Guest
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => {
                    const titlePrefix = guest.title ? `${guest.title} ` : "";
                    const fullDisplayName = `${titlePrefix}${guest.guest_name}`;
                    const isCopied = copiedId === guest.id;

                    return (
                      <tr key={guest.id} className="hover:bg-neutral-50/60 transition-colors">
                        {/* Guest Name & ID */}
                        <td className="px-5 py-4">
                          <div className="font-semibold text-neutral-900">
                            {fullDisplayName}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-neutral-400 text-xs">
                            <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] text-neutral-600">
                              ID: {guest.id}
                            </span>
                            {guest.phone && <span>{guest.phone}</span>}
                          </div>
                        </td>

                        {/* Type & Seats */}
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${
                              guest.invitation_type === "Couple"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : guest.invitation_type === "Family"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : guest.invitation_type === "Custom"
                                ? "bg-gold-50 text-gold-800 border border-gold-300"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {guest.invitation_type} ({guest.seats} {guest.seats > 1 ? "Seats" : "Seat"})
                          </span>
                          {guest.custom_text && (
                            <p className="text-[11px] text-neutral-500 italic mt-1">
                              Note: "{guest.custom_text}"
                            </p>
                          )}
                        </td>

                        {/* RSVP Status */}
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              guest.rsvp_status === "Attending"
                                ? "bg-emerald-100 text-emerald-800"
                                : guest.rsvp_status === "Declined"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-neutral-100 text-neutral-700"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                guest.rsvp_status === "Attending"
                                  ? "bg-emerald-600"
                                  : guest.rsvp_status === "Declined"
                                  ? "bg-rose-600"
                                  : "bg-neutral-400"
                              }`}
                            />
                            {guest.rsvp_status || "Pending"}
                          </span>
                          {guest.rsvp_status === "Attending" && guest.attending_count > 0 && (
                            <span className="block text-[11px] text-neutral-500 mt-0.5">
                              {guest.attending_count} attending
                            </span>
                          )}
                        </td>

                        {/* Shareable Link & WhatsApp Action */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {/* Copy Link Button */}
                            <button
                              onClick={() => handleCopyLink(guest.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                                isCopied
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                                  : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>Copy Link</span>
                                </>
                              )}
                            </button>

                            {/* 1-Click WhatsApp Send */}
                            <button
                              onClick={() => handleSendWhatsApp(guest)}
                              title="Send via WhatsApp"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold shadow-sm hover:bg-[#20bd5a] transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </button>

                            {/* Preview Link */}
                            <a
                              href={`/invite/${guest.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open Invitation Preview"
                              className="p-1.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>

                        {/* Management Actions */}
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingGuest(guest);
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                              title="Edit Guest"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setDeletingGuest(guest)}
                              className="p-1.5 rounded-lg text-neutral-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                              title="Delete Guest"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        <GuestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGuest}
          editingGuest={editingGuest}
        />

        <DeleteModal
          isOpen={!!deletingGuest}
          onClose={() => setDeletingGuest(null)}
          onConfirm={handleDeleteConfirm}
          guest={deletingGuest}
        />
      </div>
    </div>
  );
}
