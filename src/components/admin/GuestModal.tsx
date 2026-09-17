"use client";

import React, { useState, useEffect } from "react";
import { X, User, Phone, Users, Sparkles, Loader2 } from "lucide-react";
import { Guest, GuestFormData, InvitationType } from "@/types";

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guestData: GuestFormData) => Promise<void>;
  editingGuest: Guest | null;
}

const TITLE_OPTIONS = ["Mr.", "Mrs.", "Miss", "Dr.", "Rev.", "Hon.", "Mr. & Mrs."];
const INVITATION_TYPES: { type: InvitationType; label: string; defaultSeats: number }[] = [
  { type: "Single", label: "Single (Only for him/her)", defaultSeats: 1 },
  { type: "Couple", label: "Couple", defaultSeats: 2 },
  { type: "Family", label: "Family", defaultSeats: 4 },
  { type: "Custom", label: "Custom Note", defaultSeats: 1 },
];

export default function GuestModal({
  isOpen,
  onClose,
  onSave,
  editingGuest,
}: GuestModalProps) {
  const [formData, setFormData] = useState<GuestFormData>({
    title: "Mr.",
    guest_name: "",
    invitation_type: "Single",
    custom_text: "",
    seats: 1,
    phone: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editingGuest) {
      setFormData({
        id: editingGuest.id,
        title: editingGuest.title || "Mr.",
        guest_name: editingGuest.guest_name || "",
        invitation_type: editingGuest.invitation_type || "Single",
        custom_text: editingGuest.custom_text || "",
        seats: editingGuest.seats || 1,
        phone: editingGuest.phone || "",
      });
    } else {
      setFormData({
        title: "Mr.",
        guest_name: "",
        invitation_type: "Single",
        custom_text: "",
        seats: 1,
        phone: "",
      });
    }
  }, [editingGuest, isOpen]);

  if (!isOpen) return null;

  const handleTypeChange = (type: InvitationType, defaultSeats: number) => {
    setFormData((prev) => ({
      ...prev,
      invitation_type: type,
      seats: prev.seats === 1 || prev.seats === 2 || prev.seats === 4 ? defaultSeats : prev.seats,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error("Failed to save guest:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-royal-900">
              {editingGuest ? "Edit Guest Details" : "Add New Wedding Guest"}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Personalized invitation link will be generated automatically.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title & Name Row */}
          <div className="grid grid-cols-3 gap-3">
            {/* Title / Salutation */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Title
              </label>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm font-medium text-neutral-800 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              >
                {TITLE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Guest Name */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Guest Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.guest_name}
                  onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                  placeholder="e.g. Kasun Perera"
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Invitation Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-2">
              Invitation Status / Type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {INVITATION_TYPES.map(({ type, label, defaultSeats }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type, defaultSeats)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                    formData.invitation_type === type
                      ? "border-gold-500 bg-gold-50 text-gold-900 shadow-sm"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.invitation_type === type
                        ? "border-gold-600 bg-gold-600"
                        : "border-neutral-300"
                    }`}
                  >
                    {formData.invitation_type === type && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Custom Note Input (Visible ONLY if Custom is selected) */}
          {formData.invitation_type === "Custom" && (
            <div className="rounded-xl border border-gold-300 bg-gold-50/50 p-4 animate-fade-in">
              <label className="block text-xs font-bold text-gold-900 mb-1">
                Custom Invitation Note / Extra Party Details:
              </label>
              <input
                type="text"
                required
                value={formData.custom_text || ""}
                onChange={(e) => setFormData({ ...formData, custom_text: e.target.value })}
                placeholder="e.g. and 2 Children, with Fiancé, Table 4"
                className="w-full rounded-lg border border-gold-300 bg-white px-3 py-2 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:border-gold-600 focus:outline-none"
              />
              <p className="text-[11px] text-gold-700/80 mt-1">
                This custom text will be shown on the guest's personalized invitation badge.
              </p>
            </div>
          )}

          {/* Reserved Seats & WhatsApp Number Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Seats */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Reserved Seats Count
              </label>
              <input
                type="number"
                min={1}
                max={20}
                required
                value={formData.seats}
                onChange={(e) =>
                  setFormData({ ...formData, seats: Math.max(1, parseInt(e.target.value) || 1) })
                }
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-800 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>

            {/* WhatsApp Phone */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                WhatsApp Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+94771234567"
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:from-gold-600 hover:to-gold-700 disabled:opacity-50 transition-all duration-200"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{editingGuest ? "Update Guest" : "Create Invitation"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
