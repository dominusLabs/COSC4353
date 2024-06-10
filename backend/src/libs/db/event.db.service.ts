import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class EventDBService {
    private serviceName: string = 'EventDBService';
    constructor() {}

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }
}

