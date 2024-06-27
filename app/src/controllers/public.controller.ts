import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { EventService } from '../services/event.service';

@Controller()
export class PublicController {
    constructor(private readonly eventService: EventService) { }

    @Get('about')
    @Render('about')
    getAbout() {
        return {};
    }

    @Get('contact')
    @Render('contact')
    getContact() {
        return {};
    }

    @Post('contact')
    handleContact(@Body() body) {
        const { name, email, message } = body;
        // Handle contact form submission (e.g., send an email)
        return { message: 'Thank you for your message. We will get back to you shortly.' };
    }

    @Get('events')
    @Render('events')
    getEvent() {
        return {};
    }

    @Get('eventmanagment')
    @Render('eventmanagment')
    getEventManagment() {
        return {};
    }
    
    @Get('help')
    @Render('help')
    getHelp() {
        return {};
    }

    @Get('volunteer_history')
    @Render('volunteer_history')
    getVolunteerHistory() {
        return {};
    }

    @Get('volunteer_search')
    @Render('volunteer_search')
    getVolunteerSearch() {
        return {};
    }

    @Get('volunteer_details')
    @Render('volunteer_details')
    getVolunteerDetails() {
        return {};
    }

}
