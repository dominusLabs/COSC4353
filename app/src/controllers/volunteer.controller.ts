import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VolunteerService } from '../services/volunteer.service';
import { EventService } from '../services/event.service';

@Controller('/api/volunteer')
export class VolunteerController {
  constructor(
    private readonly volunteerService: VolunteerService,
    private readonly eventService: EventService,
  ) {}

  @Get('/profiles')
  async getAllVolunteerProfiles() {
    const profiles = await this.volunteerService.getAllVolunteerProfiles();
    return { status: 200, data: profiles };
  }

  @Post('/profiles')
  async createVolunteerProfile(@Body() profile) {
    return this.volunteerService.createVolunteerProfile(profile);
  }

  @Delete('/profiles/:volunteerId')
  async deleteVolunteerProfile(@Param('volunteerId') volunteerId: string) {
    return this.volunteerService.deleteVolunteerProfile(volunteerId);
  }

  @Post('/match')
  async matchVolunteersToEvent(@Body() matchData: any) {
    const { eventName, requiredSkills, volunteerNames } = matchData;
    // Logic to match volunteers to event based on skills
    const event = await this.eventService.getEventByName(eventName);
    if (!event) {
      return { status: 404, message: 'Event not found' };
    }

    const volunteers = await this.volunteerService.getVolunteersByNames(volunteerNames);
    const matchedVolunteers = volunteers.filter(volunteer => {
      return requiredSkills.every(skill => volunteer.skills.includes(skill));
    });

    if (matchedVolunteers.length === 0) {
      return { status: 404, message: 'No matching volunteers found' };
    }

    await this.volunteerService.saveMatch(event.id, matchedVolunteers);

    return { status: 200, message: 'Volunteers matched successfully', data: matchedVolunteers };
  }

  @Get('/matches')
  async getAllVolunteerMatches() {
    const matches = await this.volunteerService.getAllMatches();
    return { status: 200, data: matches };
  }

  @Delete('/match/:matchId')
  async deleteVolunteerMatch(@Param('matchId') matchId: string) {
    const result = await this.volunteerService.deleteMatch(matchId);
    if (result) {
      return { status: 200, message: 'Volunteer match deleted successfully' };
    } else {
      return { status: 404, message: 'Match not found' };
    }
  }

  @Get('/:eventId/skills')
  async getEventSkills(@Param('eventId') eventId: string) {
    return this.eventService.getEventSkills(eventId);
  }

  @Get('/:eventId/volunteers')
  async getEventVolunteers(@Param('eventId') eventId: string) {
    return this.eventService.getEventVolunteers(eventId);
  }

  async getVolunteerHistory(@Param('volunteerId') volunteerId: string) {
    return this.volunteerService.getVolunteerHistory(volunteerId);
  }
}
