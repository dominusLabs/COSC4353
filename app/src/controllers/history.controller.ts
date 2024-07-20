import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistoryService } from '../services/history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':volunteerId')
  async getVolunteerHistory(@Param('volunteerId') volunteerId: string): Promise<any> {
      return this.historyService.getVolunteerHistory(volunteerId);
  }

  @Post('add')
  async addVolunteerHistory(@Body() { volunteerId, event }: { volunteerId: string, event: any }): Promise<any> {
      return this.historyService.addVolunteerHistory(volunteerId, event);
  }
}
