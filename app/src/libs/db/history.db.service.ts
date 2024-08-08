import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class HistoryDBService {
    private serviceName: string = 'HistoryDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async getHistory(): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient
                .from('history')
                .select(`
                    event_id,
                    participation_status,
                    profile:profile (
                        fullname
                    ),
                    events:events (
                        name,
                        description,
                        location,
                        required_skills,
                        urgency,
                        date
                    )
                `);
            console.log(data, error)
            if(error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get history: ${error}` , data: null};
        }   
    }

    async getHistoryByID(userId: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
            .from('history')
            .select('*')
            .eq('event_id', userId);

            console.log(data, error)
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get history by id: ${error}`, data: null };
        }
    }

}