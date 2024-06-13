import { Controller, Get } from '@nestjs/common';
import { EventService } from '../services/event.service';


@Controller("/api/event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get("/")
  getHello(): string {
    return this.eventService.getHello();
  }
}
