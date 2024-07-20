import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendNotification(volunteerId: string, message: string): Promise<any> {
    // Simulate sending notification
    console.log(`Notification sent to volunteer ${volunteerId}: ${message}`);
    return { status: 200, message: 'Notification sent successfully' };
}

async sendEventAssignmentNotification(eventId: string, volunteerId: string): Promise<any> {
    const message = `You have been assigned to event ${eventId}`;
    return this.sendNotification(volunteerId, message);
}

async sendEventUpdateNotification(eventId: string, volunteerId: string): Promise<any> {
    const message = `Event ${eventId} has been updated`;
    return this.sendNotification(volunteerId, message);
}

async sendEventReminderNotification(eventId: string, volunteerId: string): Promise<any> {
    const message = `Reminder: Event ${eventId} is coming up soon`;
    return this.sendNotification(volunteerId, message);
}
}