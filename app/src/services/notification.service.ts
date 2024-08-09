import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../libs/db/supabase.service';

@Injectable()
export class NotificationService {
  constructor(
    private supabaseService: SupabaseService,
  ) {}

  async getNotifications(): Promise<any> {
    const { data, error } = await this.supabaseService.NotificationDBService.getNotifications();
    if (error) throw error;
    return data;
  }

  async updateNotificationStatus(notificationId: string, isRead: boolean): Promise<any> { // Change to update is_read
    const { data, error } = await this.supabaseService.NotificationDBService.updateNotificationStatus(notificationId, isRead);
    if (error) throw error;
    return data;
  }

  async createNotification(message: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseService.NotificationDBService.createNotification({
        message,
        is_read: false,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

}
