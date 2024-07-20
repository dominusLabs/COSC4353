import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class HistoryDBService {
    private serviceName: string = 'HistoryDBService';

    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async addVolunteerHistory(volunteerId: string, event: any) {
        try {
            const historyEntry = { volunteer_id: volunteerId, event, created_at: new Date().toISOString() };
            const { data, error } = await this.supabaseClient.from('volunteer_history').insert(historyEntry);
            if (error) {
                throw new Error(error.message);
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.log(error.stack);
            return { success: false, data: null, error: `Failed to add volunteer history - ${error.message}` };
        }
    }

    async getVolunteerHistory(volunteerId: string) {
        try {
            const { data, error } = await this.supabaseClient.from('volunteer_history').select("*").eq('volunteer_id', volunteerId);
            if (error) {
                throw new Error(error.message);
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.log(error.stack);
            return { success: false, data: null, error: `Failed to get volunteer history - ${error.message}` };
        }
    }
}
