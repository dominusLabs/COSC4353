import { Injectable } from '@nestjs/common';

export interface HistoryRecord {
  volunteerId: string;
  events: string[];
}

@Injectable()
export class HistoryService {
  private histories: HistoryRecord[] = [];

  addEvent(volunteerId: string, eventId: string) {
    let history = this.histories.find(h => h.volunteerId === volunteerId);
    if (!history) {
      history = { volunteerId, events: [] };
      this.histories.push(history);
    }
    history.events.push(eventId);
  }

  getHistory(volunteerId: string): HistoryRecord {
    return this.histories.find(h => h.volunteerId === volunteerId) || { volunteerId, events: [] };
  }
}
