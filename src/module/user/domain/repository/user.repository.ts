import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { IRepository } from '../../../base/IRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserPO } from 'src/module/user/domain/repository/user.po';
import { BaseRepository } from '../../../base/base.repository';
import { FindUserDto } from '../../dto/find-user.dto';
import { IDataListResponse } from 'src/module/base/IDataListResponse';

@Injectable()
export class UserRepository
  extends BaseRepository<UserPO>
  implements IRepository<UserPO>
{
  @InjectRepository(UserPO)
  private repository: Repository<UserPO>;

  save(po: object): Promise<UserPO> {
    return this.repository.save(this.transformDO2PO(UserPO, po));
  }
  async findMany(params: FindUserDto): Promise<IDataListResponse<UserPO[]>> {
    const { pageNo = 1, pageSize = 20, email, username, nickname } = params;
    const skipCount = (pageNo - 1) * pageSize;
    const where: Partial<Record<keyof FindUserDto, any>> = {};
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
  findOne(params: FindOptionsWhere<UserPO>): Promise<UserPO> {
    return this.repository.findOneBy(params);
  }
  checkExist(params: FindOptionsWhere<UserPO>): Promise<boolean> {
    const where = this.getFindOptionsWhere(params);
    return this.repository.exist({ where });
  }
}
