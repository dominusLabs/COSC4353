import { Controller, Get } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('/api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/all')
  async getNotifications() {
    return this.notificationService.getNotifications();
  }
}
