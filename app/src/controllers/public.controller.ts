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
    // async getEvents() {
    //     const events = await this.eventService.findAll();
    //     return { events };
    // }
}
