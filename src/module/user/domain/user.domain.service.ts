import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDO } from './user.entity';
import { UserRepository } from 'src/module/user/domain/repository/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { GetUserDto } from '../dto/get-user.dto';

@Injectable()
export class UserDomainService {
  @Inject(UserRepository)
  private userRepository: UserRepository;

  async create(createUserDto: CreateUserDto) {
    await this.checkExist({
      email: createUserDto.email,
      username: createUserDto.username,
      nickname: createUserDto.nickname,
    });
    const user = UserDO.create<UserDO>(UserDO, createUserDto);
    user.md5Password();
    await this.userRepository.save(user);
    return '创建成功';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existed = await this.userRepository.checkExist({
      id,
      email: updateUserDto.email,
      nickname: updateUserDto.nickname,
    });
    if (existed) {
      throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
    }
    const userDO = await this.rebuildUserById(id);
    userDO.update(updateUserDto);
    await this.userRepository.save(userDO);
    return '修改成功';
  }

  async disable(id: number) {
    const userDO = await this.rebuildUserById(id);
    userDO.disable();
    await this.userRepository.save(userDO);
    return '停用成功';
  }

  async enable(id: number) {
    const userDO = await this.rebuildUserById(id);
    userDO.enable();
    await this.userRepository.save(userDO);
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
        throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
      }
    }
    if (email) {
      const existed = await this.userRepository.checkExist({ email, id });
      if (existed) {
        throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
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
      throw new Error('用户不存在');
    }
    const userDO = UserDO.create<UserDO>(UserDO, userPO);
    return userDO;
  }
}
