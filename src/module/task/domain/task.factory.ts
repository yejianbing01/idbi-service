import { IFactory } from 'src/module/base/IFactory';
import { plainToInstance } from 'class-transformer';
import { TaskDO } from './task.entity';
import { TaskPO } from '../repository/task.po';

export class TaskFactory implements IFactory<TaskDO, TaskPO> {
  create(dto: Record<string, any>): TaskDO {
    return plainToInstance(TaskDO, dto);
  }

  rebuild(po: TaskPO): TaskDO {
    return plainToInstance(TaskDO, po);
  }

  transformDO2PO(dO: TaskDO): TaskPO {
    return plainToInstance(TaskPO, dO);
  }
}
