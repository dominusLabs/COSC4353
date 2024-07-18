import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  sendNotification(volunteerId: string, message: string): string {

    console.log(`Sending notification to volunteer ${volunteerId}: ${message}`);
    return `Notification sent to volunteer ${volunteerId}`;
  }
}