import { WeddingConfig } from "@/types";

export const weddingConfig: WeddingConfig = {
  // --- COUPLE DETAILS ---
  groom: {
    fullName: "Kasun Malinda Fernando",
    callName: "Kasun",
    title: "Groom",
    parentsText: "Son of Mr. Nihal Fernando & Mrs. Shirani Fernando",
    hometown: "Moratuwa, Sri Lanka"
  },
  bride: {
    fullName: "Nethmi Kavindya Perera",
    callName: "Nethmi",
    title: "Bride",
    parentsText: "Daughter of Mr. Sunil Perera & Mrs. Malkanthi Perera",
    hometown: "Nugegoda, Sri Lanka"
  },

  // --- WEDDING DATE & TIMINGS ---
  date: {
    displayDate: "Sunday, 18th October 2026",
    timeDisplay: "From 09:30 AM onwards",
    isoDateTime: "2026-10-18T09:30:00+05:30", // Used for live countdown timer
    calendarEvent: {
      title: "Wedding Celebration of Kasun & Nethmi",
      description: "Join us in celebrating the marriage of Kasun and Nethmi at Shangri-La Hotel, Colombo.",
      location: "The Grand Ballroom, Shangri-La Hotel, Colombo 02, Sri Lanka",
      startDate: "20261018T093000",
      endDate: "20261018T163000"
    }
  },

  // --- FORMAL INVITATION TEXT ---
  invitationNote: "Together with their parents, Kasun & Nethmi joyfully request the honour of your presence at the celebration of their holy matrimony & auspicious Poruwa ceremony.",

  // --- AUSPICIOUS PORUWA & EVENT TIMELINE ---
  timeline: [
    {
      time: "09:30 AM",
      title: "Arrival of Guests",
      description: "Welcome drink and traditional Magul Bera welcome."
    },
    {
      time: "10:14 AM",
      title: "Auspicious Poruwa Ceremony",
      description: "Traditional Sri Lankan Nekath Poruwa rituals & Jayamangala Gatha."
    },
    {
      time: "11:00 AM",
      title: "Civil Registration & Toast",
      description: "Signing of the marriage register followed by the champagne toast."
    },
    {
      time: "12:30 PM",
      title: "Wedding Banquet Lunch",
      description: "International buffet lunch with live acoustic music."
    },
    {
      time: "02:00 PM",
      title: "Cake Cutting & Celebrations",
      description: "First dance, cake cutting, traditional Sri Lankan Baila and party."
    }
  ],

  // --- VENUE & GOOGLE MAPS PREVIEW ---
  venue: {
    name: "The Grand Ballroom, Shangri-La Hotel",
    city: "Colombo 02, Sri Lanka",
    address: "1 Galle Face, Colombo 02, Sri Lanka",
    // Embedded Google Maps iframe URL
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.718873406208!2d79.84278477583685!3d6.924151793075574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593bcf9b6cd5%3A0xe543c74ea6d35706!2sShangri-La%20Colombo!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk",
    // Direct Google Maps navigation link
    mapDirectUrl: "https://maps.app.goo.gl/hGz71q7Xh15oZf3V9",
    contactPhone: "+94 11 788 8288"
  },

  // --- BACKGROUND MUSIC ---
  music: {
    trackTitle: "Romantic Sri Lankan Flute Melody",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-flute-112191.mp3"
  }
};
