import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class VolunteerDBService {
    private serviceName: string = 'VolunteerDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }
}

