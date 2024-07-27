import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class NotificationDBService {
    private serviceName: string = 'NotificationDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async getNotifications(): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient
                .from('notification')
                .select('*');
            console.log(data, error)
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get notifications: ${error}` , data: null};
        }   
    }

    async getNotificationByID(notificationId: string): Promise<any> {
        try {
            const { data, error } = await this.supabaseClient
                .from('notification')
                .select('*')
                .eq('id', notificationId);

            console.log(data, error)
            if (error) {
                throw error;
            }
            return { success: true, data: data, error: null };
        } catch (error) {
            console.error(error);
            return { success: false, error: `Failed to get notification by id: ${error}`, data: null };
        }
    }
}
