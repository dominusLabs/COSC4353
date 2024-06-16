import { Injectable, Scope, Inject } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import {AuthDBService} from './auth.db.service';
import {EventDBService} from './event.db.service';
import {NotificationDBService} from './notification.db.service';
import {PricingDBService} from './pricing.db.service';
import {ProfileDBService} from './profile.db.service';
import {VolunteerDBService} from './volunteer.db.service';


@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private supabaseUserClient: SupabaseClient;
  public supabaseAdminClient: SupabaseClient;
  
  constructor()  {
    const supabaseUrl: string = process.env.SUPABASE_URL || 'http://localhost:8000';
    const supabaseKey: string = process.env.SUPABASE_KEY || 'http://localhost:8000';
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    this.supabaseAdminClient = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getClient(token: string): SupabaseClient {
    if (this.supabaseUserClient) {
      return this.supabaseUserClient;
    }

    const supabaseUserClient: SupabaseClient = createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }, 
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
    });

    return supabaseUserClient;
  }

  async validateToken(token: string): Promise<boolean> {
    const { data, error } = await this.supabaseAdminClient.auth.getUser(token);
    return !!data && !error;
  }

  get AuthDBService(): AuthDBService {
    return new AuthDBService();
  }
  get EventDBService(): EventDBService {
    return new EventDBService();
  }
  get NotificationDBService(): NotificationDBService {
    return new NotificationDBService();
  }
  get PricingDBService(): PricingDBService {
    return new PricingDBService();
  }
  get ProfileDBService(): ProfileDBService {
    return new ProfileDBService();
  }
  get VolunteerDBService(): VolunteerDBService {
    return new VolunteerDBService();
  }
}
