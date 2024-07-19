import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../libs/db/supabase.service';

@Injectable()
export class VolunteerService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllVolunteerProfiles(): Promise<any> {
    const { data, error } = await this.supabaseService.VolunteerDBService.getAllVolunteerProfiles();
    if (error) throw error;
    return data;
  }

  async createVolunteerProfile(profile: any): Promise<any> {
    try {
      const { success, data, error } = await this.supabaseService.VolunteerDBService.createVolunteerProfile(profile);
      if (!success) {
        return { status: 400, message: error };
      }
      return { status: 200, data: data, message: "Volunteer profile created successfully" };
    } catch (error) {
      console.log(error.stack);
      return { status: 500, message: `Failed to create volunteer profile - ${error.message}` };
    }
  }

  async deleteVolunteerProfile(volunteerId: string): Promise<any> {
    try {
      const { success, data, error } = await this.supabaseService.VolunteerDBService.deleteVolunteerProfile(volunteerId);
      if (!success) {
        return { status: 400, message: error };
      }
      return { status: 200, data: data, message: "Volunteer profile deleted successfully" };
    } catch (error) {
      console.log(error.stack);
      return { status: 500, message: `Failed to delete volunteer profile - ${error.message}` };
    }
  }

  async getVolunteerSkills(volunteerId: string): Promise<any> {
    try {
      const { success, data, error } = await this.supabaseService.VolunteerDBService.getVolunteerSkills(volunteerId);
      if (!success) {
        return { status: 400, message: error };
      }
      return { status: 200, data: data, message: "Volunteer skills retrieved successfully" };
    } catch (error) {
      console.log(error.stack);
      return { status: 500, message: `Failed to retrieve volunteer skills - ${error.message}` };
    }
  }

  async getVolunteerAvailability(volunteerId: string): Promise<any> {
    try {
      const { success, data, error } = await this.supabaseService.VolunteerDBService.getVolunteerAvailability(volunteerId);
      if (!success) {
        return { status: 400, message: error };
      }
      return { status: 200, data: data, message: "Volunteer availability retrieved successfully" };
    } catch (error) {
      console.log(error.stack);
      return { status: 500, message: `Failed to retrieve volunteer availability - ${error.message}` };
    }
  }
}
