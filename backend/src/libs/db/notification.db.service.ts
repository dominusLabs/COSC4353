import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class NotificationDBService {
    private serviceName: string = 'NotificationDBService';
    constructor() {}

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }
}

