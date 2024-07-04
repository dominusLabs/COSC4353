import { Controller, Get, Render, Post, Body } from '@nestjs/common';

@Controller()
export class HomeController {
    @Get()
    @Render('index')
    getHome() {
        return { title: 'A Non-Profit Organization' };
    }

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

    @Get('help')
    @Render('help')
    getHelp() {
        return {};
    }
    
    @Post('contact')
    handleContact(@Body() body) {
        const { name, email, message } = body;
        // Handle contact form submission (e.g., send an email)
        return { message: 'Thank you for your message. We will get back to you shortly.' };
    }

}
