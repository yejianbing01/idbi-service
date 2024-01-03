import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TaskPO } from './task.po';
import { FindTaskDto } from '../dto/find-task.dot';
import { IDataListResponse } from '../../base/IDataListResponse';
import { BaseRepository } from '../../base/base.repository';

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
