import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetingManageService {
  getHello(): string {
    return 'Hello World!';
  }
}
