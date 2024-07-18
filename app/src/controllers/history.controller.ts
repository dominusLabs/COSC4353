import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistoryService } from '../services/history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('add')
  addEvent(@Body() body: { volunteerId: string; eventId: string }) {
    this.historyService.addEvent(body.volunteerId, body.eventId);
    return { message: 'Event added' };
  }

  @Get(':volunteerId')
  getHistory(@Param('volunteerId') volunteerId: string) {
    return this.historyService.getHistory(volunteerId);
  }
}
