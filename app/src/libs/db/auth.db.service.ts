import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { RegisterAccount, LoginAccount, VerifyAccount } from '../interfaces/auth.interface';

@Injectable()
export class AuthDBService {
    private serviceName: string = 'AuthDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    async hello(): Promise<string> {
        return `Hello from ${this.serviceName}`;
    }

    async getUserbyUserID(userID: string): Promise<any> {
        try {
            const { data, error } =await this.supabaseClient.from('users').select("*").eq('user_id', userID).single()
            if(error) {
                throw new Error(error.message)
            }
            return { success: true, data: data, error: null}
        } catch(error) {
            console.log(error.stack)
            return { success: false, data: null, error: `Failed to get user by user ID - ${error.message}`}
        }
    }

    async register(body: RegisterAccount): Promise<any> {
        try { 
            console.log(body)
            const { data, error } = await this.supabaseClient.auth.signUp({
                email: body.email,
                password: body.password,
                options: {
                    emailRedirectTo: `http://localhost:3000/api/auth/verify-account?email=${body.email}`
                }
            })
            
            console.log(data, error)
            if(error) {
                return { success: false, data: null, error: error.message }
            }

            await this.supabaseClient.from('users').insert({
                user_id: data.user.id,
                email: body.email,
                account_type: body.accountType
            })

            return { success: true, data: {}, error: null }
        } catch(error) {
            console.log(error.stack)
            return { success: false, data: null, error: 'Internal server error - please try again later' }
        }
    }

    async verifyAccount(body: VerifyAccount): Promise<any> {
        try { 
            const { data, error } = await this.supabaseClient.from('users').update({
                verified: true
            }).eq('email', body.email)

            console.log(data, error)
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

            if(!data.session || !data.user) {
                return { success: false, data: null, error: "Failed to login"}
            }

            if(!data.user.email) {
                return { success: false, data: null, error: "Failed to login"}
            }


            return { success: true, data: {
                token: data.session.access_token
            }, error: null }
        } catch(error) {
            console.log(error.stack)
            return { success: false, data: null, error: 'Internal server error - please try again later' }
        }
    }
}

