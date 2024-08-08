import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class VolunteerDBService {
  private serviceName: string = 'VolunteerDBService';
  constructor(private supabaseClient: SupabaseClient) {
      this.supabaseClient = supabaseClient;
  }

  async getVolunteers(): Promise<any> {
    try { 
        const { data, error } = await this.supabaseClient
            .from('profile')
            .select('*');
        console.log(data, error)
        if (error) {
            throw error;
        }
        return { success: true, data: data, error: null };
    } catch (error) {
        console.error(error);
        return { success: false, error: `Failed to get volunteers: ${error}` , data: null};
    }   
}

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
