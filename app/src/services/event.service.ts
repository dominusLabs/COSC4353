import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class EventService {
    private supabase: SupabaseClient;

    setSupabaseClient(supabaseUrl: string, supabaseKey: string): void {
        console.log('Setting Supabase Client:', supabaseUrl, supabaseKey);
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase URL and Key are required');
        }
        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    getHello(): string {
        return 'Hello World!';
    }

    async getAllEvents(): Promise<any> {
      const { data, error } = await this.supabase
          .from('events')
          .select('*');
      if (error) throw error;
      return data;
  }

  async createEvent(event): Promise<any> {
    console.log(event);
    const { data, error } = await this.supabase
        .from('events')
        .insert([event]);
    if (error) throw error;
    if (data && (data as any[]).length > 0) { 
        return data[0];
    }
    throw new Error('Failed to create event');
  }

  async deleteEvent(eventId: string): Promise<any> {
      const { data, error } = await this.supabase
          .from('events')
          .delete()
          .eq('event_id', eventId);
      if (error) throw error;
      return data;
  }

  async getEventSkills(eventId: string): Promise<any> {
      const { data, error } = await this.supabase
          .from('events')
          .select('skills')
          .eq('event_id', eventId);
      if (error) throw error;
      return data;
  }

  async getEventVolunteers(eventId: string): Promise<any> {
      const { data, error } = await this.supabase
          .from('EventVolunteers')
          .select('volunteer_id, volunteer_name')
          .eq('event_id', eventId);
      if (error) throw error;
      return data;
  }
}