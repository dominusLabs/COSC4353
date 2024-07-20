import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../libs/db/supabase.service';

@Injectable()
export class VolunteerService {
    constructor(
        private readonly supabaseService: SupabaseService,
    ) {}

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
            const { data, error } = await this.supabaseService.VolunteerDBService.getVolunteerSkills(volunteerId);
            if (error) {
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
            const { data, error } = await this.supabaseService.VolunteerDBService.getVolunteerAvailability(volunteerId);
            if (error) {
                return { status: 400, message: error };
            }
            return { status: 200, data: data, message: "Volunteer availability retrieved successfully" };
        } catch (error) {
            console.log(error.stack);
            return { status: 500, message: `Failed to retrieve volunteer availability - ${error.message}` };
        }
    }

    async matchVolunteersToEvent(eventName: string, requiredSkills: string[]): Promise<any> {
        try {
            const { data: event, error: eventError } = await this.supabaseService.EventDBService.getEventByName(eventName);
            if (eventError || !event) {
                return { status: 404, message: 'Event not found' };
            }

            const { data: volunteers, error: volunteerError } = await this.supabaseService.VolunteerDBService.getAllVolunteerProfiles();
            if (volunteerError) throw volunteerError;

            const matchedVolunteers = volunteers.filter(volunteer => {
                return requiredSkills.every(skill => volunteer.skills.includes(skill));
            });

            if (matchedVolunteers.length === 0) {
                return { status: 404, message: 'No matching volunteers found' };
            }

            // Save the match to the database (if needed)
            await this.supabaseService.VolunteerDBService.saveMatch(event.id, matchedVolunteers);

            return { status: 200, message: 'Volunteers matched successfully', data: matchedVolunteers };
        } catch (error) {
            console.log(error.stack);
            return { status: 500, message: `Failed to match volunteers - ${error.message}` };
        }
    }

    async getAllMatches(): Promise<any> {
        const { data, error } = await this.supabaseService.VolunteerDBService.getAllMatches();
        if (error) throw error;
        return data;
    }

    async deleteMatch(matchId: string): Promise<any> {
        try {
            const { success, data, error } = await this.supabaseService.VolunteerDBService.deleteMatch(matchId);
            if (!success) {
                return { status: 400, message: error };
            }
            return { status: 200, data: data, message: "Volunteer match deleted successfully" };
        } catch (error) {
            console.log(error.stack);
            return { status: 500, message: `Failed to delete volunteer match - ${error.message}` };
        }
    }
}
