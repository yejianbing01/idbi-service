import { BaseRepository } from 'src/module/base/base.repository';
import { TaskPO } from './task.po';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { IDataListResponse } from 'src/module/base/IDataListResponse';
import { FindTaskDto } from '../dto/find-task.dot';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends BaseRepository<TaskPO> {
  constructor(
    @InjectRepository(TaskPO) protected repository: Repository<TaskPO>,
  ) {
    super(repository);
  }

  async findMany(params: FindTaskDto): Promise<IDataListResponse<TaskPO[]>> {
    const { pageNo = 1, pageSize = 20, name, flag } = params;
    const skipCount = (pageNo - 1) * pageSize;
    const where: FindOptionsWhere<TaskPO> = { flag };
    name && (where.name = Like(`%${name}%`));

    const [taskPOList, count] = await this.repository.findAndCount({
      skip: Math.max(skipCount, 0),
      take: pageSize,
      where,
    });
    return {
      pagination: {
        count,
        pageNo,
        pageSize,
      },
      data: taskPOList,
    };
  }
}
