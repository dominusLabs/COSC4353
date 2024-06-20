import { Controller, Get, Render } from '@nestjs/common';
import { VolunteerService } from '../services/volunteer.service';


@Controller("/api/volunteer")
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

}
