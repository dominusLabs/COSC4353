import { Injectable } from '@nestjs/common';
import { UpdateProfile } from '../libs/interfaces/profile.interface';
import { SupabaseService } from '../libs/db/supabase.service';

@Injectable()
export class ProfileService {
  constructor(
    private supabaseService: SupabaseService,
  ) {}

  async updateProfile(userId: string, profile: UpdateProfile) {
    try { 
      const {success, data, error} = await this.supabaseService.ProfileDBService.updateProfile(userId, profile);
      if (success != true) {
        return { status: 400, message: error };
      }

      return { status: 200, message: 'Profile updated successfully' };
    } catch(error){
      return { status: 500, message: 'Internal server error - please try again later' }
    }
  }

  async getProfile(userID: string) {
    try { 
      const {success, data, error} = await this.supabaseService.ProfileDBService.getProfile(userID);
      if (success != true) {
        return { status: 400, message: error };
      }
      return { status: 200, message: 'Profile retrieved successfully', data: data };
    } catch(error) {
      return { status: 500, message: 'Internal server error - please try again later' }
    }
  }
}
