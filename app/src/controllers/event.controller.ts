import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventService } from '../services/event.service';

@Controller('/api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}


  // @Get('/:eventId/skills')
  // async getEventSkills(@Param('eventId') eventId: string) {
  //   return this.eventService.getEventSkills(eventId);
  // }

//  @Get('/:eventId/volunteers')
//  async getEventVolunteers(@Param('eventId') eventId: string) {
//    return this.eventService.getEventVolunteers(eventId);
//  }

  @Post('/create')
  async createEvent(@Body() eventData: any) {
    return this.eventService.createEvent(eventData);
  }

  // @Delete('/:eventId')
  // async deleteEvent(@Param('eventId') eventId: string) {
  //   return this.eventService.deleteEvent(eventId);
  // }
}
