import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await this.userRepository.save(user);
    return '创建成功';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userPO = await this.userRepository.findOneBy({ id });
  }
}
