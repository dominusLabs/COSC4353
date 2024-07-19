import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { EventService } from '../services/event.service';

@Controller('/api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/all')
  async getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Post('/')
  async createEvent(@Body() event) {
    return this.eventService.createEvent(event);
  }

  @Delete('/:eventId')
  async deleteEvent(@Param('eventId') eventId: string) {
    return this.eventService.deleteEvent(eventId);
  }
}
