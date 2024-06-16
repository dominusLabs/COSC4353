import { Controller, Get, Render } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @Render('login')
  login() {
    return { };
  }

  @Get('/register')
  @Render('register')
  register() {
    return { };
  }

  @Get("/")
  getHello(): string {
    return this.authService.getHello();
  }
}
