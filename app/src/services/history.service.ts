import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../libs/db/supabase.service';

@Injectable()
export class HistoryService {
  constructor(
    private supabaseService: SupabaseService,
  ) {}

  async getHistory(): Promise<any> {
    const { data, error } = await this.supabaseService.HistoryDBService.getHistory();
    if (error) throw error;
    return data;
  }
}
