import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MeetingManageService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class MeetingManageController {
  @Inject('USER_SERVICE')
  private userClient: ClientProxy;

  constructor(private readonly meetingManageService: MeetingManageService) {}

  @Get()
  getHello(): string {
    return this.meetingManageService.getHello();
  }

  @Get('sum')
  microTest(@Query('num') str: string) {
    const numArr = str.split(',').map((item) => parseInt(item));
    return this.userClient.send('sum', numArr);
  }
}
