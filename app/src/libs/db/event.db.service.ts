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
            const { data, error } = await this.supabaseClient.from('events').upsert([event], { onConflict: 'event_id' })
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
                .from('events')
                .select('matched_volunteers')
                .eq('event_id', eventId);
            if (error) {
                throw error;
            }

            // loop through the matched volunteers and get the profile information from all matching ids 
            let volunteers = {}
            let matchedVolunteers = data[0].matched_volunteers;
            return { success: true, data: matchedVolunteers, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get event volunteers: ${error}`, data: null };
        }
    }

    

    async getEventByID(eventId: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
            .from('events')
            .select('*')
            .eq('event_id', eventId).single();

            console.log(data, error)
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get event by id: ${error}`, data: null };
        }
    }

    async saveMatch(eventId: string, matchedVolunteers: any[]): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient
                .from('events')
                .update({ matched_volunteers: matchedVolunteers })
                .eq('event_id', eventId);
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to save match: ${error}`, data: null };
        }
    }

    async deleteMatch(eventId: string, volunteerId: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
                .from('events')
                .select('matched_volunteers')
                .eq('event_id', eventId);

            if(error) {
                throw error;
            }

            let matchedVolunteers = data[0].matched_volunteers;

            // remove the volunteer from the matched volunteers array
            matchedVolunteers = matchedVolunteers.filter((volunteer: any) => volunteer.volunteer_id !== volunteerId);

            // save again in db
            const { data: updatedData, error: updatedError } = await this.supabaseClient
                .from('events')
                .update({ matched_volunteers: matchedVolunteers })
                .eq('event_id', eventId);

            if(updatedError) {
                throw updatedError;
            }
           
            return { success: true, data: updatedData, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to delete match: ${error}`, data: null };
        }
    }


    async getEventByName(eventName: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
            .from('events')
            .select('name')
            .eq('name', eventName);
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get event by name: ${error}`, data: null };
        }
    }

}
