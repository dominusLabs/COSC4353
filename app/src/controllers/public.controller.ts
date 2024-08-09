import { Controller, Get, Post, Body, Render, UseGuards, Request, Response} from '@nestjs/common';
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

    @Get('logout')
    async logout(@Request() req, @Response() res) {
        res.cookie('token', '', { expires: new Date(0) });
        res.redirect('/login');
    }

    @Get('register')
    @Render('register')
    getRegister() {
        return {};
    }

    @Get('events')
    @Render('events')
    getEvent() {
        return {};
    }

    @Get('eventmanagement')
    @UseGuards(AuthGuard)
    @Render('eventmanagement')
    getEventManagement(@Request() req) {
        return { user: req.body.user };
    }

    @Get('volunteer_history')
    @UseGuards(AuthGuard)
    @Render('volunteer_history')
    getVolunteerHistory(@Request() req) {
        return { user: req.body.user };
    }

    @Get('volunteer_search')
    @UseGuards(AuthGuard)
    @Render('volunteer_search')
    getVolunteerSearch(@Request() req) {
        return { user: req.body.user };
    }

    @Get('volunteer_details')
    @UseGuards(AuthGuard)
    @Render('volunteer_details')
    getVolunteerDetails(@Request() req) {
        return { user: req.body.user };
    }

    @Get('volunteer_matching')
    @UseGuards(AuthGuard)
    @Render('volunteer_matching')
    getVolunteerMatching(@Request() req) {
        return { user: req.body.user };
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @Render('profile')
    getProfile(@Request() req) {
        return { user: req.body.user };
    }

    @Get('notifications')
    @UseGuards(AuthGuard)
    @Render('notifications')
    getNotifications(@Request() req) {
        return { user: req.body.user };
    }

    @Get('report_events')
    @UseGuards(AuthGuard)
    @Render('report_events')
    getReportEvents(@Request() req) {
        return { user: req.body.user };
    }

    @Get('report_volunteers')
    @UseGuards(AuthGuard)
    @Render('report_volunteers')
    getReportVolunteer(@Request() req) {
        return { user: req.body.user };
    }
}
