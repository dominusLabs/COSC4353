import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class VolunteerDBService {
    private serviceName: string = 'VolunteerDBService';
    constructor() {}

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }
}

