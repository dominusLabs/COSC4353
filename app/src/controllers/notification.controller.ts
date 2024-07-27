import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('/api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/all')
  async getNotifications() {
    return this.notificationService.getNotifications();
  }

  @Patch('/:id') // Endpoint for updating notification status
  async updateNotificationStatus(
    @Param('id') id: string,
    @Body() updateNotificationDto: { isRead: boolean } // Change to isRead
  ) {
    return this.notificationService.updateNotificationStatus(id, updateNotificationDto.isRead); // Change to isRead
  }
}
