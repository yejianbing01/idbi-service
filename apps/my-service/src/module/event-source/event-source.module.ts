import { Module } from '@nestjs/common';
import { EventSourceService } from './event-source.service';
import { EventSourceController } from './event-source.controller';

@Module({
  controllers: [EventSourceController],
  providers: [EventSourceService],
})
export class EventSourceModule {}
