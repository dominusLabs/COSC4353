import { Injectable } from '@nestjs/common';

export interface HistoryRecord {
  volunteerId: string;
  events: string[];
}

@Injectable()
export class HistoryService {
  private volunteerHistories = new Map<string, any[]>(); // Hardcoded data structure

  async getVolunteerHistory(volunteerId: string): Promise<any> {
      const history = this.volunteerHistories.get(volunteerId) || [];
      return { status: 200, data: history, message: 'Volunteer history retrieved successfully' };
  }

  async addVolunteerHistory(volunteerId: string, event: any): Promise<any> {
      const history = this.volunteerHistories.get(volunteerId) || [];
      history.push(event);
      this.volunteerHistories.set(volunteerId, history);
      return { status: 200, message: 'Volunteer history updated successfully' };
  }
}
