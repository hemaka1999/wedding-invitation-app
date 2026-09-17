"use client";

import React, { useState } from "react";
import { AlertTriangle, Trash2, Loader2, X } from "lucide-react";
import { Guest } from "@/types";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  guest: Guest | null;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  guest,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !guest) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      console.error("Failed to delete guest:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const displayName = `${guest.title ? guest.title + " " : ""}${guest.guest_name}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="font-serif text-lg font-bold text-neutral-900">
          Delete Guest Invitation?
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Are you sure you want to remove <span className="font-bold text-neutral-900">"{displayName}"</span> from the guest list?
          Their personalized link (<span className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-700">{guest.id}</span>) will no longer work.
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Guest</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
