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
    try {
        const { data, error } = await this.supabase.from('events').insert([event]);
        console.log(error)
        if(error) {
            throw new Error(error.message)
        }
        return { success: true, data: data, error: null}
    } catch(error) {
        console.log(error.stack)
        return { status: 500, message: `Failed to create event - ${error.message}` }
    }
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