import { Controller, Get,  } from '@nestjs/common';
import { ReportService } from '../services/report.service';

@Controller('/api/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

    @Get('/volunteers')
    async getVolunteers() {
      return this.reportService.getVolunteers();
    }

    @Get('/events')
    async getEvents() {
      return this.reportService.getEvents();
    }
}
