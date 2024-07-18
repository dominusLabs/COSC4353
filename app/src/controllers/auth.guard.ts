import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../libs/db/supabase.service';
import { Response } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
    private reflector: Reflector
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();
    const cookieHeader = request.headers['cookie'];

    if (!cookieHeader) {
      this.redirect(response);
      return false;
    }

    const cookies = this.parseCookies(cookieHeader);
    const token = cookies['token']; 

    if (!token) {
      this.redirect(response);
      return false;
    }

    
    const {data, error} = await this.supabaseService.validateToken(token);
    if (error || !data) {
      this.redirect(response);
      return false;
    }

    request.body.user = data.user;
    if (request.url.includes("/admin") && data.user.account_type !== 'administrator') {
      this.redirect(response);
      return false;
    }

    console.log("returning true")
    return true;
  }

  private redirect(response: Response) {
    response.redirect('/login');
  }

  private parseCookies(cookieHeader: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    cookieHeader.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.split('=');
      cookies[name.trim()] = rest.join('=').trim();
    });
    return cookies;
  }
}
