import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  createTask(@Body('name') name: string) {
    console.log(name);
  }
}
