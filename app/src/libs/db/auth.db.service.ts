import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { RegisterAccount, LoginAccount } from '../interfaces/auth.interface';

@Injectable()
export class AuthDBService {
    private serviceName: string = 'AuthDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }

    async register(body: RegisterAccount): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient.auth.signUp({
                email: body.email,
                password: body.password,
            })
            return { success: true, data: {}, error: null }
        } catch(error) {
            console.log(error.stack)
            return { success: false, data: null, error: 'Internal server error - please try again later' }
        }
    }


    async login(body: LoginAccount): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient.auth.signInWithPassword({
                email: body.email,
                password: body.password,
            })
            return { success: true, data: {}, error: null }
        } catch(error) {
            console.log(error.stack)
            return { success: false, data: null, error: 'Internal server error - please try again later' }
        }
    }
}

