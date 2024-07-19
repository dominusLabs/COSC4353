import { Injectable } from '@nestjs/common';

import { RegisterAccount, LoginAccount, VerifyAccount } from '../libs/interfaces/auth.interface';
import { SupabaseService } from '../libs/db/supabase.service';


@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
  ) {}

  async registerAccount(body: RegisterAccount) {
    try { 
      const {success, data, error} = await this.supabaseService.AuthDBService.register(body);
      if (success != true) {
        return { status: 400, message: error };
      }
      return { status: 200, message: 'Account created successfully. Please check your email for verification' };
    } catch(error){
      return { status: 500, message: 'Internal server error - please try again later' }
    }
  }

  async verifyAccount(body: VerifyAccount) {
    try { 
      const {success, data, error} = await this.supabaseService.AuthDBService.verifyAccount(body);
      if(success != true) {
        return { status: 400, message: error };
      }
      return { status: 200, message: 'Account verified successfully' };
    } catch(error) {
      return { status: 500, message: 'Internal server error - please try again later' }
    }
  }

  async loginAccount(body: LoginAccount) {
    try {
      const {success, data, error} = await this.supabaseService.AuthDBService.login(body);
      if (success != true) {
        return { status: 400, message: error };
      }
      return { status: 200, message: 'Logged in!', data: data };
    } catch(error) {
      return { status: 500, message: 'Internal server error - please try again later' }
    }
  }
}
