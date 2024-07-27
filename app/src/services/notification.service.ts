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
}
