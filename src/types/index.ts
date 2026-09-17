export type InvitationType = "Single" | "Couple" | "Family" | "Custom";
export type RsvpStatus = "Pending" | "Attending" | "Declined";

export interface Guest {
  id: string;
  title: string;
  guest_name: string;
  invitation_type: InvitationType;
  custom_text?: string;
  seats: number;
  phone?: string;
  rsvp_status: RsvpStatus;
  attending_count: number;
  wishes?: string;
  created_at?: string;
}

export interface GuestFormData {
  id?: string;
  title: string;
  guest_name: string;
  invitation_type: InvitationType;
  custom_text?: string;
  seats: number;
  phone?: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface WeddingConfig {
  groom: {
    fullName: string;
    callName: string;
    title: string;
    parentsText: string;
    hometown: string;
  };
  bride: {
    fullName: string;
    callName: string;
    title: string;
    parentsText: string;
    hometown: string;
  };
  date: {
    displayDate: string;
    timeDisplay: string;
    isoDateTime: string;
    calendarEvent: {
      title: string;
      description: string;
      location: string;
      startDate: string;
      endDate: string;
    };
  };
  invitationNote: string;
  timeline: TimelineEvent[];
  venue: {
    name: string;
    city: string;
    address: string;
    mapEmbedUrl: string;
    mapDirectUrl: string;
    contactPhone: string;
  };
  music: {
    trackTitle: string;
    audioUrl: string;
  };
}
