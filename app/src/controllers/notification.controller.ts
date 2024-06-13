import { Controller, Get } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';


@Controller("/api/notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get("/")
  getHello(): string {
    return this.notificationService.getHello();
  }
}
