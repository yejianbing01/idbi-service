import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskRepository } from './repository/task.repository';
import { TaskFactory } from './domain/task.factory';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, TaskFactory],
})
export class TaskModule {}
