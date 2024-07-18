import { Controller, Get, Render } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { Body, Post, Req, UseGuards, Res } from '@nestjs/common';
import { UpdateProfile } from '../libs/interfaces/profile.interface';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';


@Controller("/api/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post("/update")
  @UseGuards(AuthGuard)
  async updateProfile(@Req() request: Request, @Res() response: Response, @Body() profile: UpdateProfile) {
    const userId = request.body.user.id;
    let responseBody = await this.profileService.updateProfile(userId, profile);
    response.status(responseBody.status).json(responseBody);
  }

  @Get("/get")
  @UseGuards(AuthGuard)
  async getProfile(@Req() request: Request, @Res() response: Response) {
    const userId = request.body.user.id;
    let responseBody = await this.profileService.getProfile(userId);
    response.status(responseBody.status).json(responseBody);
  }
}
