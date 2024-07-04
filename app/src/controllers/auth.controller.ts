import { Controller, Get, Post, Render, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterAccount } from '../libs/interfaces/auth.interface';


@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register-account')
  registerAccount(@Body() body: RegisterAccount) {
    return this.authService.registerAccount(body);
  }

  // @Get('/verify-account')
  // verifyAccount() {
  //   return this.authService.verifyAccount();
  // }

  @Post('/login-account')
  loginAccount(@Body() body: RegisterAccount) {
    return this.authService.loginAccount(body);
  }

  // @Get("/")
  // getHello(): string {
  //   return this.authService.getHello();
  // }
}
