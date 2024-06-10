import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { EventController } from './controllers/event.controller';
import { NotificationController } from './controllers/notification.controller';
import { PricingController } from './controllers/pricing.controller';
import { ProfileController } from './controllers/profile.controller';
import { VolunteerController } from './controllers/volunteer.controller';


import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { NotificationService } from './services/notification.service';
import { PricingService } from './services/pricing.service';
import { ProfileService } from './services/profile.service';
import { VolunteerService } from './services/volunteer.service';

import { SupabaseService } from './libs/db/supabase.service';


@Module({
  imports: [],
  controllers: [AuthController, EventController, NotificationController, PricingController, ProfileController, VolunteerController],
  providers: [AuthService, EventService, NotificationService, PricingService, ProfileService, VolunteerService, SupabaseService],
})

export class AppModule {}
