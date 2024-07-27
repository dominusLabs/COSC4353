import { Controller, Get,  } from '@nestjs/common';
import { HistoryService } from '../services/history.service';

@Controller('/api/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/all')
  async getHistory() {
    return this.historyService.getHistory();
  }
}
