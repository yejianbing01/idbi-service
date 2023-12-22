import { BasePO } from 'src/module/base/base.po';
import { Column } from 'typeorm';
import { TaskFlag } from '../config/task-flag.enum';

export class TaskPO extends BasePO {
  @Column({
    length: 50,
    comment: '名称',
    unique: true,
  })
  name: string;

  @Column({
    length: 50,
    unique: true,
    comment: '执行时间',
  })
  cronTime: string;

  @Column({
    enum: TaskFlag,
    comment: '状态 0: 开始 1：停止 2：删除',
  })
  flag: TaskFlag;

  update(params: Partial<TaskPO>): TaskPO {
    Object.assign(this, params);
    return this;
  }
}
