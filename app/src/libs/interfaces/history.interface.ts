export interface VolunteerHistory {
    id: string;
    userId: string;
    eventId: string;
    hours: number;
    role: string;
    date: Date;
  }
  
  export interface CreateVolunteerHistory {
    userId: string;
    eventId: string;
    hours: number;
    role: string;
    date: Date;
  }
  
  export interface UpdateVolunteerHistory {
    id: string;
    hours?: number;
    role?: string;
    date?: Date;
  }