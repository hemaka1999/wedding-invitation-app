import { authConfig } from "@/config/authConfig";
import { Guest, GuestFormData, RsvpStatus } from "@/types";
import { generateShortId } from "./idUtils";

const LOCAL_STORAGE_KEY = "wedding_guest_list_db";

// Realistic default sample guest data for Sri Lankan wedding preview
const DEFAULT_GUESTS: Guest[] = [
  {
    id: "amal92",
    title: "Dr.",
    guest_name: "Amal Wijesinghe & Partner",
    invitation_type: "Couple",
    custom_text: "",
    seats: 2,
    phone: "+94771234567",
    rsvp_status: "Attending",
    attending_count: 2,
    wishes: "Wishing you both a lifetime of happiness and blessings!",
    created_at: new Date().toISOString(),
  },
  {
    id: "sunil4",
    title: "Mr.",
    guest_name: "Sunil Silva & Family",
    invitation_type: "Family",
    custom_text: "",
    seats: 4,
    phone: "+94779876543",
    rsvp_status: "Pending",
    attending_count: 0,
    wishes: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "kav81x",
    title: "Miss",
    guest_name: "Kavindi Jayawardena",
    invitation_type: "Single",
    custom_text: "",
    seats: 1,
    phone: "+94712345678",
    rsvp_status: "Pending",
    attending_count: 0,
    wishes: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "custom3",
    title: "Mr.",
    guest_name: "Rohan Gunaratne",
    invitation_type: "Custom",
    custom_text: "and 2 Children",
    seats: 3,
    phone: "+94781122334",
    rsvp_status: "Attending",
    attending_count: 3,
    wishes: "Can't wait to celebrate with Kasun & Nethmi!",
    created_at: new Date().toISOString(),
  },
];

// Helper: Get guests from LocalStorage
function getLocalGuests(): Guest[] {
  if (typeof window === "undefined") return DEFAULT_GUESTS;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_GUESTS));
    return DEFAULT_GUESTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_GUESTS;
  }
}

// Helper: Save guests to LocalStorage
function saveLocalGuests(guests: Guest[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guests));
  }
}

export const apiService = {
  // Fetch all guests
  async getAllGuests(): Promise<Guest[]> {
    const apiUrl = authConfig.googleSheetApiUrl;
    if (apiUrl && apiUrl.startsWith("http")) {
      try {
        const res = await fetch(`${apiUrl}?action=get_all`, {
          method: "GET",
          redirect: "follow",
        });
        const text = await res.text();
        if (text.includes("accounts.google.com") || text.includes("<!doctype html")) {
          console.error("⚠️ GOOGLE APPS SCRIPT PERMISSION ERROR: Access is restricted! Please set 'Who has access' to 'Anyone' in your Apps Script deployment settings.");
        } else {
          const result = JSON.parse(text);
          if (result.success && Array.isArray(result.data)) {
            return result.data;
          }
        }
      } catch (err) {
        console.warn("Google Sheet API unreachable, using local database:", err);
      }
    }
    return getLocalGuests();
  },

  // Fetch single guest by Short UUID
  async getGuestById(id: string): Promise<Guest | null> {
    if (!id) return null;
    const apiUrl = authConfig.googleSheetApiUrl;
    if (apiUrl && apiUrl.startsWith("http")) {
      try {
        const res = await fetch(`${apiUrl}?id=${encodeURIComponent(id)}`, {
          method: "GET",
          redirect: "follow",
        });
        const text = await res.text();
        if (text.includes("accounts.google.com") || text.includes("<!doctype html")) {
          console.error("⚠️ GOOGLE APPS SCRIPT PERMISSION ERROR: Access is restricted! Please set 'Who has access' to 'Anyone' in your Apps Script deployment settings.");
        } else {
          const result = JSON.parse(text);
          if (result.success && result.data) {
            return result.data;
          }
        }
      } catch (err) {
        console.warn("Google Sheet API unreachable, using local database:", err);
      }
    }
    const local = getLocalGuests();
    return local.find((g) => String(g.id).toLowerCase() === String(id).toLowerCase()) || null;
  },

  // Create new guest
  async createGuest(guestData: GuestFormData): Promise<Guest> {
    const newGuest: Guest = {
      id: generateShortId(),
      title: guestData.title || "Mr.",
      guest_name: guestData.guest_name || "",
      invitation_type: guestData.invitation_type || "Single",
      custom_text: guestData.invitation_type === "Custom" ? (guestData.custom_text || "") : "",
      seats: Number(guestData.seats) || 1,
      phone: guestData.phone || "",
      rsvp_status: "Pending",
      attending_count: 0,
      wishes: "",
      created_at: new Date().toISOString(),
    };

    const apiUrl = authConfig.googleSheetApiUrl;
    if (apiUrl && apiUrl.startsWith("http")) {
      try {
        await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "create_guest", guest: newGuest }),
        });
      } catch (err) {
        console.warn("Google Sheet API error:", err);
      }
    }

    const guests = getLocalGuests();
    const updated = [newGuest, ...guests];
    saveLocalGuests(updated);
    return newGuest;
  },

  // Update existing guest
  async updateGuest(guestData: GuestFormData): Promise<boolean> {
    const apiUrl = authConfig.googleSheetApiUrl;
    if (apiUrl && apiUrl.startsWith("http")) {
      try {
        await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "update_guest", guest: guestData }),
        });
      } catch (err) {
        console.warn("Google Sheet API error:", err);
      }
    }

    const guests = getLocalGuests();
    const updated = guests.map((g) =>
      g.id === guestData.id
        ? {
            ...g,
            title: guestData.title,
            guest_name: guestData.guest_name,
            invitation_type: guestData.invitation_type,
            custom_text: guestData.invitation_type === "Custom" ? (guestData.custom_text || "") : "",
            seats: Number(guestData.seats),
            phone: guestData.phone || "",
          }
        : g
    );
    saveLocalGuests(updated);
    return true;
  },

  // Delete guest
  async deleteGuest(id: string): Promise<boolean> {
    const apiUrl = authConfig.googleSheetApiUrl;
    if (apiUrl && apiUrl.startsWith("http")) {
      try {
        await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "delete_guest", id: id }),
        });
      } catch (err) {
        console.warn("Google Sheet API error:", err);
      }
    }

    const guests = getLocalGuests();
    const updated = guests.filter((g) => g.id !== id);
    saveLocalGuests(updated);
    return true;
  },

  // Guest RSVP submission
  async submitRsvp(
    id: string,
    rsvpStatus: RsvpStatus,
    attendingCount: number,
    wishes: string
  ): Promise<boolean> {
    const apiUrl = authConfig.googleSheetApiUrl;
    if (apiUrl && apiUrl.startsWith("http")) {
      try {
        await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "rsvp",
            id: id,
            rsvp_status: rsvpStatus,
            attending_count: Number(attendingCount),
            wishes: wishes || "",
          }),
        });
      } catch (err) {
        console.warn("Google Sheet API error:", err);
      }
    }

    const guests = getLocalGuests();
    const updated = guests.map((g) =>
      g.id === id
        ? {
            ...g,
            rsvp_status: rsvpStatus,
            attending_count: Number(attendingCount),
            wishes: wishes || "",
          }
        : g
    );
    saveLocalGuests(updated);
    return true;
  },
};
