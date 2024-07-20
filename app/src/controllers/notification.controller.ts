import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';


@Controller("/api/notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @Get("/")
  // getHello(): string {
  //   return this.notificationService.getHello();
  // }

  @Post('send')
  async sendNotification(@Body() { volunteerId, message }: { volunteerId: string, message: string }): Promise<any> {
      return this.notificationService.sendNotification(volunteerId, message);
  }

  @Post('event-assignment')
  async sendEventAssignmentNotification(@Body() { eventId, volunteerId }: { eventId: string, volunteerId: string }): Promise<any> {
      return this.notificationService.sendEventAssignmentNotification(eventId, volunteerId);
  }

  @Post('event-update')
  async sendEventUpdateNotification(@Body() { eventId, volunteerId }: { eventId: string, volunteerId: string }): Promise<any> {
      return this.notificationService.sendEventUpdateNotification(eventId, volunteerId);
  }

  @Post('event-reminder')
  async sendEventReminderNotification(@Body() { eventId, volunteerId }: { eventId: string, volunteerId: string }): Promise<any> {
      return this.notificationService.sendEventReminderNotification(eventId, volunteerId);
  }
}
