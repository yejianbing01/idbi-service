import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MeetingManageService } from './app.service';
import { ClientProxy, GrpcMethod } from '@nestjs/microservices';
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

  @GrpcMethod('BookService', 'FindBook')
  findBook(data: { id: number }) {
    const items = [
      { id: 1, name: '前端调试通关秘籍', desc: '网页和 node 调试' },
      { id: 2, name: 'Nest 通关秘籍', desc: 'Nest 和各种后端中间件' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
