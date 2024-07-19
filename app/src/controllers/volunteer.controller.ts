import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { VolunteerService } from '../services/volunteer.service';

@Controller('/api/volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get('/all')
  async getAllVolunteerProfiles() {
    return this.volunteerService.getAllVolunteerProfiles();
  }

  @Post('/')
  async createVolunteerProfile(@Body() profile: any) {
    return this.volunteerService.createVolunteerProfile(profile);
  }

  @Delete('/:volunteerId')
  async deleteVolunteerProfile(@Param('volunteerId') volunteerId: string) {
    return this.volunteerService.deleteVolunteerProfile(volunteerId);
  }
}
