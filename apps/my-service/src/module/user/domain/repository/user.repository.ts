import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../base/base.repository';
import { FindUserDto } from '../../dto/find-user.dto';
import { IDataListResponse } from '../../../base/IDataListResponse';
import { UserPO } from './user.po';

@Injectable()
export class UserRepository extends BaseRepository<UserPO> {
  constructor(
    @InjectRepository(UserPO) protected repository: Repository<UserPO>,
  ) {
    super(repository);
  }

  async findMany(params: FindUserDto): Promise<IDataListResponse<UserPO[]>> {
    const { pageNo = 1, pageSize = 20, email, username, nickname } = params;
    const skipCount = (pageNo - 1) * pageSize;
    const where: FindOptionsWhere<UserPO> = {};
    email && (where.email = Like(`%${email}%`));
    username && (where.username = Like(`%${username}%`));
    nickname && (where.nickname = Like(`%${nickname}%`));

    const [userPOList, count] = await this.repository.findAndCount({
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
      data: userPOList,
    };
  }
}
