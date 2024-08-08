import { Controller, Get, Post, Render, Body, Param, Redirect, Query, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterAccount, VerifyAccount } from '../libs/interfaces/auth.interface';
import { Response } from 'express'; // Make sure it's imported from 'express'


@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/register-account')
  async registerAccount(@Body() body: RegisterAccount, @Res() response: Response) {
    let responseBody = await this.authService.registerAccount(body);
    response.status(responseBody.status).json(responseBody);
  }

  @Get('/verify-account')
  async verifyAccount(@Query() query: any, @Res() res: Response): Promise<void> {
    let email = query.email
    if (!email) {
      return res.redirect('/login');
    }

    const body: VerifyAccount = { email };
    let response = await this.authService.verifyAccount(body);
    res.redirect('/login');
  }

  @Post('/login-account')
  async loginAccount(@Body() body: RegisterAccount, @Res() response: Response) {
    let responseBody = await this.authService.loginAccount(body);
    response.status(responseBody.status).json(responseBody);
  }
}
