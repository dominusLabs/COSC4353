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

  async getVolunteersByNames(volunteerNames: string[]): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('profiles')
        .select('*')
        .in('name', volunteerNames);
      if (error) {
        throw error;
      }
      return { success: true, data: data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get volunteers by names: ${error}`, data: null };
    }
  }

  async saveMatch(eventId: string, volunteers: any[]): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('matches')
        .insert(volunteers.map(volunteer => ({ event_id: eventId, volunteer_id: volunteer.id })));
      if (error) {
        throw error;
      }
      return { success: true, data: data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to save match: ${error}`, data: null };
    }
  }

  async getAllMatches(): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('matches')
        .select('*');
      if (error) {
        throw error;
      }
      return { success: true, data: data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get all matches: ${error}`, data: null };
    }
  }

  async deleteMatch(matchId: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('matches')
        .delete()
        .eq('id', matchId);
      if (error) {
        throw error;
      }
      return { success: true, data: data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to delete match: ${error}`, data: null };
    }
  }

  async getVolunteerHistory(volunteerId: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('matches')
        .select('*')
        .eq('volunteer_id', volunteerId);
      if (error) {
        throw error;
      }
      return { success: true, data: data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get volunteer history: ${error}`, data: null };
    }
  }
}
