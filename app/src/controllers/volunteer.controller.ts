import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { VolunteerService } from '../services/volunteer.service';
import { EventService } from '../services/event.service';
import { AuthGuard } from '../controllers/auth.guard';


@Controller('/api/volunteer')
export class VolunteerController {
  constructor(
    private readonly volunteerService: VolunteerService,
    private readonly eventService: EventService,
  ) {}

  @Get('/profiles')
  @UseGuards(AuthGuard)
  async getAllVolunteerProfiles() {
    const profiles = await this.volunteerService.getAllVolunteerProfiles();
    return { status: 200, data: profiles };
  }

  @Post('/profiles')
  @UseGuards(AuthGuard)
  async createVolunteerProfile(@Body() profile) {
    return this.volunteerService.createVolunteerProfile(profile);
  }

  @Delete('/profiles/:volunteerId')
  @UseGuards(AuthGuard)
  async deleteVolunteerProfile(@Param('volunteerId') volunteerId: string) {
    return this.volunteerService.deleteVolunteerProfile(volunteerId);
  }

  @Post('/matchVolunteersToEvent')
  @UseGuards(AuthGuard)
  async matchVolunteersToEvent(@Body() matchData) {
    const { eventID, requiredSkills} = matchData;
    // Logic to match volunteers to event based on skills
    const event = await this.eventService.getEventById(eventID);
    if (event.status != 200) {
      return { status: 404, message: 'Event not found' };
    }

    const fetchedVolunteers = await this.volunteerService.getAllVolunteerProfileFormatted();
    if(fetchedVolunteers.status != 200) {
      return { status: 500, message: 'Failed to fetch volunteers' };
    }

    const fetchedVolunteersData = fetchedVolunteers.data;
    const allVolunteersMatching = fetchedVolunteersData.filter(volunteer => {
      return requiredSkills.every(skill => volunteer.skills.includes(skill));
    });

    const allVolunteersSelected = []
    event.data.matched_volunteers.forEach(matched_volunteer => {
      console.log(matched_volunteer)
      let volunteer = fetchedVolunteersData.find(volunteer => volunteer.fullname === matched_volunteer)
      if(volunteer) {
        allVolunteersSelected.push(volunteer)
      }
    })

    if (allVolunteersMatching.length === 0) {
      return { status: 404, message: 'No matching volunteers found' };
    }

    return { status: 200, message: 'Volunteers matched successfully', data: {
      all_volunteers: allVolunteersMatching,
      matched_volunteers: allVolunteersSelected
    } };
  }

  @Post('/matches')
  @UseGuards(AuthGuard)
  async getAllVolunteerMatches(@Body() {eventId, requiredSkills}) {
    const matches = await this.eventService.getEventVolunteers(eventId);
    return { status: 200, data: matches };
  }



  // @Delete('/match/:eventId/:volunteerId')
  // async deleteVolunteerMatch(@Param('eventId') eventId: string, @Param('volunteerId') volunteerId: string) {
  //   const result = await this.eventService.deleteMatch(eventId, volunteerId);
  //   if (result) {
  //     return { status: 200, message: 'Volunteer match deleted successfully' };
  //   } else {
  //     return { status: 404, message: 'Match not found' };
  //   }
  // }

  @Get('/:eventId/skills')
  @UseGuards(AuthGuard)
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
