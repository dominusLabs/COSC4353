import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class EventDBService {
    private serviceName: string = 'EventDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }

    async getAllEvents(): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient
                .from('events')
                .select('*');
           
            if(error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get all events: ${error}` , data: null};
        }   
    }

    async createEvent(event: any): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient.from('events').insert([event]);
            console.log(error)
            if(error) {
                throw new Error(error.message)
            }
            return { success: true, data: data, error: null}
        } catch(error) {
            console.error(error);
            return { success: false, error: `Failed to create event: ${error}` , data: null};
        }
    }

    async deleteEvent(eventId: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
                .from('events')
                .delete()
                .eq('event_id', eventId);
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to delete event: ${error}`, data: null };
        }
    }

    async getEventSkills(eventId: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
                .from('events')
                .select('skills')
                .eq('event_id', eventId);
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get event skills: ${error}`, data: null };
        }
    }

    async getEventVolunteers(eventId: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
                .from('EventVolunteers')
                .select('volunteer_id, volunteer_name')
                .eq('event_id', eventId);
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get event volunteers: ${error}`, data: null };
        }
    }
}
