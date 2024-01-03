import { Module } from '@nestjs/common';
import { MeetingManageController } from './app.controller';
import { MeetingManageService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8888,
        },
      },
    ]),
  ],
  controllers: [MeetingManageController],
  providers: [MeetingManageService],
})
export class MeetingManageModule {}
