import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { UserDomainService } from './user.domain.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userDomainService: UserDomainService) {}

  create(createUserDto: CreateUserDto) {
    return this.userDomainService.create(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userDomainService.update(id, updateUserDto);
  }

  disable(id: number) {
    return this.userDomainService.disable(id);
  }

  enable(id: number) {
    return this.userDomainService.enable(id);
  }

  async findUsers(params: FindUserDto) {
    return this.userDomainService.findUsers(params);
  }

  async getUser(params: GetUserDto) {
    return this.userDomainService.getUser(params);
  }
}
