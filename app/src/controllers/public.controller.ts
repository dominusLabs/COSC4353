import { Controller, Get, Post, Body, Render, UseGuards} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { AuthGuard } from './auth.guard';

@Controller()
export class PublicController {
    constructor(private readonly eventService: EventService) { }

    @Get('login')
    @Render('login')
    getLogin() {
        return {};
    }

    @Get('register')
    @Render('register')
    getRegister() {
        return {};
    }

    @Get('events')
    @UseGuards(AuthGuard)
    @Render('events')
    getEvent() {
        return {};
    }

    @Get('eventmanagement')
    @UseGuards(AuthGuard)
    @Render('eventmanagement')
    getEventManagement() {
        return {};
    }


    @Get('volunteer_history')
    @UseGuards(AuthGuard)
    @Render('volunteer_history')
    getVolunteerHistory() {
        return {};
    }

    @Get('volunteer_search')
    @UseGuards(AuthGuard)
    @Render('volunteer_search')
    getVolunteerSearch() {
        return {};
    }

    @Get('volunteer_details')
    @UseGuards(AuthGuard)
    @Render('volunteer_details')
    getVolunteerDetails() {
        return {};
    }

    @Get('volunteer_matching')
    @UseGuards(AuthGuard)
    @Render('volunteer_matching')
    getVolunteerMatching() {
        return {};
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @Render('profile')
    getProfile() {
        return {};
    }

    @Get('notifications')
    @UseGuards(AuthGuard)
    @Render('notifications')
    getNotifications() {
        return {};
    }

}
