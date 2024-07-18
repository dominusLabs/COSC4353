import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { EventController } from './controllers/event.controller';
import { NotificationController } from './controllers/notification.controller';
import { PricingController } from './controllers/pricing.controller';
import { ProfileController } from './controllers/profile.controller';
import { VolunteerController } from './controllers/volunteer.controller';
import { HistoryController } from './controllers/history.controller';

import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { NotificationService } from './services/notification.service';
import { PricingService } from './services/pricing.service';
import { ProfileService } from './services/profile.service';
import { VolunteerService } from './services/volunteer.service';
import { HistoryService } from './services/history.service';

import { SupabaseService } from './libs/db/supabase.service';
import { HomeController } from './controllers/home.controller';
import { PublicController } from './controllers/public.controller';


@Module({
  controllers: [AuthController, EventController, NotificationController, PricingController, ProfileController, VolunteerController, HomeController, PublicController, HistoryController],
  providers: [AuthService, EventService, NotificationService, PricingService, ProfileService, VolunteerService, SupabaseService, HistoryService],
})

export class AppModule {}
