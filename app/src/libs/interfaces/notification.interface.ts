export interface Notification {
    id: string;
    type: string;
    message: string;
    userId: string;
    eventId: string;
    read: boolean;
    createdAt: Date;
  }
  
  export interface CreateNotification {
    type: string;
    message: string;
    userId: string;
    eventId: string;
  }
  
  export interface UpdateNotification {
    id: string;
    read: boolean;
  }