import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthDBService {
    private serviceName: string = 'AuthDBService';
    constructor() {}

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }
}

