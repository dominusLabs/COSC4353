import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class VolunteerDBService {
  constructor(private supabaseClient: SupabaseClient) {}

  async getAllVolunteerProfiles(): Promise<any> {
    try{
      const { data, error } = await this.supabaseClient.from('profile').select('*');
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get all volunteer profiles: ${error}`, data: null };
    }
  }

  async createVolunteerProfile(profile: any): Promise<any> {
    try{
      const { data, error } = await this.supabaseClient.from('profile').insert([profile]);
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to create volunteer profile: ${error}`, data: null };
    }
  }

  async deleteVolunteerProfile(volunteerId: string): Promise<any> {
    try{
      const { data, error } = await this.supabaseClient.from('profile').delete().eq('id', volunteerId);
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to delete volunteer profile: ${error}`, data: null };
    }
  }

  async getVolunteerSkills(volunteerId: string): Promise<any> {
    try{
      const { data, error } = await this.supabaseClient.from('profile').select('skills').eq('id', volunteerId);
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get volunteer skills: ${error}`, data: null };
    }
  }

  async getVolunteerAvailability(volunteerId: string): Promise<any> {
    try{
      const { data, error } = await this.supabaseClient.from('profile').select('availability').eq('id', volunteerId);
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get volunteer availability: ${error}`, data: null };
    }
  }

  async getVolunteerByNames(volunteerNames: string[]): Promise<any> {
    try{
      const { data, error } = await this.supabaseClient.from('profile').select('*').in('fullname', volunteerNames);
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get volunteer by names: ${error}`, data: null };
    }
  }

  async getAllMatchedVolunteers(eventId: string): Promise<any> {
    try{
      const { data, error } = await this.supabaseClient.from('events').select('matched_volunteers').eq('event_id', eventId);
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error(error);
      return { success: false, error: `Failed to get all matched volunteers: ${error}`, data: null };
    }
  }

  
}
