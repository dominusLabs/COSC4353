import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class NotificationDBService {
    private serviceName: string = 'NotificationDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async createNotification(volunteerId: string, message: string) {
        try {
            const notification = { volunteer_id: volunteerId, message, created_at: new Date().toISOString() };
            const { data, error } = await this.supabaseClient.from('notifications').insert(notification);
            if (error) {
                throw new Error(error.message);
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.log(error.stack);
            return { success: false, data: null, error: `Failed to create notification - ${error.message}` };
        }
    }

    async getNotificationsByVolunteer(volunteerId: string) {
        try {
            const { data, error } = await this.supabaseClient.from('notifications').select("*").eq('volunteer_id', volunteerId);
            if (error) {
                throw new Error(error.message);
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.log(error.stack);
            return { success: false, data: null, error: `Failed to get notifications - ${error.message}` };
        }
    }
}

