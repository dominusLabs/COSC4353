import { Controller, Get } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';


@Controller("/api/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("/")
  getHello(): string {
    return this.profileService.getHello();
  }
}
