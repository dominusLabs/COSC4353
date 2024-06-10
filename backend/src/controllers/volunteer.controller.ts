import { Controller, Get } from '@nestjs/common';
import { VolunteerService } from '../services/volunteer.service';


@Controller("/api/volunteer")
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get("/")
  getHello(): string {
    return this.volunteerService.getHello();
  }
}
