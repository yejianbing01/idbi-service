import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MeetingManageService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { LibService } from '@app/lib';

@Controller()
export class MeetingManageController {
  @Inject('USER_SERVICE')
  private userClient: ClientProxy;

  @Inject(LibService)
  private libService: LibService;

  constructor(private readonly meetingManageService: MeetingManageService) {}

  @Get()
  getHello(): string {
    return this.libService.libTest();
  }

  @Get('sum')
  microTest(@Query('num') str: string) {
    const numArr = str.split(',').map((item) => parseInt(item));
    return this.userClient.send('sum', numArr);
  }
}
