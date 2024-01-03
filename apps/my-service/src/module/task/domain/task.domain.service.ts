import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TaskFactory } from './task.factory';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { BusinessException } from 'lib/business.exception';

@Injectable()
export class TaskDomainService {
  constructor(
    private taskRepository: TaskRepository,
    private taskFactory: TaskFactory,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    this.checkExist({ name: createTaskDto.name });
    const taskDO = this.taskFactory.create(createTaskDto);
    const taskPO = this.taskFactory.transformDO2PO(taskDO);
    await this.taskRepository.save(taskPO);
    return '创建成功';
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    this.checkExist({ id, name: updateTaskDto.name });
    const taskDO = await this.rebuildTaskById(id);
    taskDO.update(updateTaskDto);
    const taskPO = this.taskFactory.transformDO2PO(taskDO);
    await this.taskRepository.save(taskPO);
    return '修改成功';
  }

  async start(id: number) {
    const taskDO = await this.rebuildTaskById(id);
    taskDO.start();
    const taskPO = this.taskFactory.transformDO2PO(taskDO);
    await this.taskRepository.save(taskPO);
    return '开始成功';
  }

  async stop(id: number) {
    const taskDO = await this.rebuildTaskById(id);
    taskDO.stop();
    const taskPO = this.taskFactory.transformDO2PO(taskDO);
    await this.taskRepository.save(taskPO);
    return '停止成功';
  }

  async delete(id: number) {
    const taskDO = await this.rebuildTaskById(id);
    taskDO.delete();
    const taskPO = this.taskFactory.transformDO2PO(taskDO);
    await this.taskRepository.save(taskPO);
    return '删除成功';
  }

  private async checkExist(params: { id?: number; name?: string }) {
    const { id, name } = params;
    if (name) {
      const existed = await this.taskRepository.checkExist({ name, id });
      if (existed) {
        BusinessException.throw('任务已存在');
      }
    }
  }

  /**
   * 根据id重建task
   * @param id
   * @returns
   */
  private async rebuildTaskById(id: number) {
    const taskPO = await this.taskRepository.findOne({ id });
    if (!taskPO) {
      BusinessException.throw('任务不存在');
    }
    return this.taskFactory.rebuild(taskPO);
  }
}
