import { Controller, Get, Render } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';


@Controller("/api/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/')
  @Render('profile')
  profile() {
    return { };
  }

  @Get("/")
  getHello(): string {
    return this.profileService.getHello();
  }
}
