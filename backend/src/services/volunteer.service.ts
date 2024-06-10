import { Injectable } from '@nestjs/common';

@Injectable()
export class VolunteerService {
  getHello(): string {
    return 'Hello World!';
  }
}
