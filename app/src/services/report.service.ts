import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../libs/db/supabase.service';

@Injectable()
export class ReportService {
  constructor(
    private supabaseService: SupabaseService,
  ) {}

  async getEvents(): Promise<any> {
    const { data, error } = await this.supabaseService.ReportDBService.getEvents();
    if (error) throw error;
    return data;
  }

  async getVolunteers(): Promise<any> {
    const { data, error } = await this.supabaseService.ReportDBService.getVolunteers();
    if (error) throw error;
    return data;
  }
}