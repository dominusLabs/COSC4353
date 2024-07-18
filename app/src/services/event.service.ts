import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../libs/db/supabase.service';


@Injectable()
export class EventService {
    constructor(
        private supabaseService: SupabaseService,
    ) {}

    async getAllEvents(): Promise<any> {
      const { data, error } = await this.supabaseService.EventDBService.getAllEvents();
      if (error) throw error;
      return data;
  }

  async createEvent(event): Promise<any> {
    try {
        const {sucess, data, error} = await this.supabaseService.EventDBService.createEvent(event);
        if (!sucess != true) {
            return { status: 400, message: error }
        }
        return { status: 200, data: data, message: "Event created successfully" }
    } catch(error) {
        console.log(error.stack)
        return { status: 500, message: `Failed to create event - ${error.message}` }
    }
  }
  

//   async deleteEvent(eventId: string): Promise<any> {
//       const { data, error } = await this.supabaseClient
//           .from('events')
//           .delete()
//           .eq('event_id', eventId);
//       if (error) throw error;
//       return data;
//   }

//   async getEventSkills(eventId: string): Promise<any> {
//       const { data, error } = await this.supabaseClient
//           .from('events')
//           .select('skills')
//           .eq('event_id', eventId);
//       if (error) throw error;
//       return data;
//   }

//   async getEventVolunteers(eventId: string): Promise<any> {
//       const { data, error } = await this.supabaseClient
//           .from('EventVolunteers')
//           .select('volunteer_id, volunteer_name')
//           .eq('event_id', eventId);
//       if (error) throw error;
//       return data;
//   }
}