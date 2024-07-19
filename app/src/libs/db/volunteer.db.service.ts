import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class VolunteerDBService {
  constructor(private supabaseClient: SupabaseClient) {}

  async getAllVolunteerProfiles(): Promise<any> {
    const { data, error } = await this.supabaseClient.from('profiles').select('*');
    if (error) throw error;
    return { success: true, data, error: null };
  }

  async createVolunteerProfile(profile: any): Promise<any> {
    const { data, error } = await this.supabaseClient.from('profiles').insert([profile]);
    if (error) throw error;
    return { success: true, data, error: null };
  }

  async deleteVolunteerProfile(volunteerId: string): Promise<any> {
    const { data, error } = await this.supabaseClient.from('profiles').delete().eq('id', volunteerId);
    if (error) throw error;
    return { success: true, data, error: null };
  }

  async getVolunteerSkills(volunteerId: string): Promise<any> {
    const { data, error } = await this.supabaseClient.from('profiles').select('skills').eq('id', volunteerId);
    if (error) throw error;
    return { success: true, data, error: null };
  }

  async getVolunteerAvailability(volunteerId: string): Promise<any> {
    const { data, error } = await this.supabaseClient.from('profiles').select('availability').eq('id', volunteerId);
    if (error) throw error;
    return { success: true, data, error: null };
  }
}
