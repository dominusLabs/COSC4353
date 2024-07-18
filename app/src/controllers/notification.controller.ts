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
  sendNotification(@Body() body: { volunteerId: string; message: string }) {
    return this.notificationService.sendNotification(body.volunteerId, body.message);
  }
}
