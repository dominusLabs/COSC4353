import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
    @Get()
    @Render('index')
    getHome() {
        return { title: 'A Non-Profit Organization' };
    }
}
