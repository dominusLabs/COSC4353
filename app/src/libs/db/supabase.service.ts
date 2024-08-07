import { Injectable, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { AuthDBService } from './auth.db.service';
import { EventDBService } from './event.db.service';
import { NotificationDBService } from './notification.db.service';
import { PricingDBService } from './pricing.db.service';
import { ProfileDBService } from './profile.db.service';
import { VolunteerDBService } from './volunteer.db.service';
import { HistoryDBService } from './history.db.service';
import { ReportDBService } from './report.db.service';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private supabaseUserClient: SupabaseClient;
  public supabaseAdminClient: SupabaseClient;

  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
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
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    this.supabaseUserClient = supabaseUserClient; // Cache the client for future use
    return this.supabaseUserClient;
  }

  async validateToken(token: string): Promise<{ data: any, error: any }> {
    const { data, error } = await this.supabaseAdminClient.auth.getUser(token);
    if (error) {
      return { data, error };
    }

    const { data: userData, error: userError } = await this.AuthDBService.getUserbyUserID(data.user.id);
    if (userError) {
      return { data, error: userError };
    }
    return { data, error };
  }

  get AuthDBService(): AuthDBService {
    return new AuthDBService(this.supabaseAdminClient);
  }
  get EventDBService(): EventDBService {
    return new EventDBService(this.supabaseAdminClient);
  }
  get NotificationDBService(): NotificationDBService {
    return new NotificationDBService(this.supabaseAdminClient);
  }
  get PricingDBService(): PricingDBService {
    return new PricingDBService(this.supabaseAdminClient);
  }
  get ProfileDBService(): ProfileDBService {
    return new ProfileDBService(this.supabaseAdminClient);
  }
  get VolunteerDBService(): VolunteerDBService {
    return new VolunteerDBService(this.supabaseAdminClient);
  }
  get HistoryDBService(): HistoryDBService {
    return new HistoryDBService(this.supabaseAdminClient);
  }
  get ReportDBService(): ReportDBService {
    return new ReportDBService(this.supabaseAdminClient);
  }
}
