export interface UpdateHistory {
    id: string;
    participation_status: string;
  }
  
  export interface GetHistory {
    userId: string;
    eventId: string;
    hours: number;
    role: string;
    date: Date;
  }