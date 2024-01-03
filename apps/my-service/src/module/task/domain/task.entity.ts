import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskFlag } from '../config/task-flag.enum';
import { BaseDO } from '../../base/base.entity';

export class TaskDO extends BaseDO {
  private id: number;
  private name: string;
  private cronTime: string;
  private flag: TaskFlag;

  update(updateTaskDto: UpdateTaskDto) {
    this.name = updateTaskDto.name;
    this.cronTime = updateTaskDto.cronTime;
    return this;
  }

  start() {
    this.flag = TaskFlag.start;
    return this;
  }
  stop() {
    this.flag = TaskFlag.stop;
    return this;
  }

  delete() {
    this.flag = TaskFlag.delete;
    return this;
  }
}
