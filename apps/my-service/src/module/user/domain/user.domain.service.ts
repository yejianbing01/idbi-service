import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDO } from './user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { UserFactory } from './user.factory';
import { BusinessException } from 'apps/my-service/src/lib/business.exception';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserDomainService {
  @Inject(UserRepository)
  private userRepository: UserRepository;

  @Inject(UserFactory)
  private userFactory: UserFactory;

  async create(createUserDto: CreateUserDto) {
    await this.checkExist({
      email: createUserDto.email,
      username: createUserDto.username,
      nickname: createUserDto.nickname,
    });
    const userDO = UserDO.create<UserDO>(UserDO, createUserDto);
    userDO.md5Password();
    const userPO = this.userFactory.transformDO2PO(userDO);
    await this.userRepository.save(userPO);
    return '创建成功';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existed = await this.userRepository.checkExist({
      id,
      email: updateUserDto.email,
      nickname: updateUserDto.nickname,
    });
    if (existed) {
      BusinessException.throw('邮箱已存在');
    }
    const userDO = await this.rebuildUserById(id);
    userDO.update(updateUserDto);
    const userPO = this.userFactory.transformDO2PO(userDO);
    await this.userRepository.save(userPO);
    return '修改成功';
  }

  async disable(id: number) {
    const userDO = await this.rebuildUserById(id);
    userDO.disable();
    const userPO = this.userFactory.transformDO2PO(userDO);
    await this.userRepository.save(userPO);
    return '停用成功';
  }

  async enable(id: number) {
    const userDO = await this.rebuildUserById(id);
    userDO.enable();
    const userPO = this.userFactory.transformDO2PO(userDO);
    await this.userRepository.save(userPO);
    return '启用成功';
  }

  async findUsers(params: FindUserDto) {
    return this.userRepository.findMany(params);
  }

  async getUser(params: GetUserDto) {
    return this.userRepository.findOne(params);
  }

  private async checkExist(params: {
    id?: number;
    username?: string;
    nickname?: string;
    email?: string;
  }) {
    const { id, username, email } = params;
    if (username) {
      const existed = await this.userRepository.checkExist({ username, id });
      if (existed) {
        BusinessException.throw('用户名已存在');
      }
    }
    if (email) {
      const existed = await this.userRepository.checkExist({ email, id });
      if (existed) {
        BusinessException.throw('邮箱已存在');
      }
    }
  }

  /**
   * 根据id重建user
   * @param id
   * @returns
   */
  private async rebuildUserById(id: number) {
    const userPO = await this.userRepository.findOne({ id });
    if (!userPO) {
      BusinessException.throw('用户不存在');
    }
    const userDO = UserDO.create<UserDO>(UserDO, userPO);
    return userDO;
  }
}
