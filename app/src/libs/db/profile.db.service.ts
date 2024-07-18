import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateProfile, GetProfile } from '../interfaces/profile.interface';


@Injectable()
export class ProfileDBService {
    private serviceName: string = 'ProfileDBService';
    constructor(private supabaseClient: SupabaseClient) {
        this.supabaseClient = supabaseClient;
    }


    async updateProfile(userId: string, profile: UpdateProfile) {
        try {
            profile['user_id']= userId;
            delete profile['user']
            const { data, error } =await this.supabaseClient.from('profile').upsert(profile, { onConflict: 'user_id' })
            console.log(data, error)
            if(error) {
                throw new Error(error.message)
            }
            return { success: true, data: data, error: null}
        } catch(error) {
            console.log(error.stack)
            return { success: false, data: null, error: `Failed to get user by user ID - ${error.message}`}
        }
    }

    async getProfile(userID: string) {
        try {
            const { data, error } =await this.supabaseClient.from('profile').select("*").eq('user_id', userID).maybeSingle()
            if(error) {
                throw new Error(error.message)
            }

            if(data === null) {
                return { success: false, data: {}, error: "No profile created yet. Please enter your profile details below"}
            }

            return { success: true, data: data, error: null}
        } catch(error) {
            console.log(error.stack)
            return { success: false, data: null, error: `Failed to get user by user ID - ${error.message}`}
        }
    }
}

