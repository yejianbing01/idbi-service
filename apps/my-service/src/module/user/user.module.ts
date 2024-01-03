import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPO } from './domain/repository/user.po';
import { RolePO } from '../role/domain/po/role.po';
import { PermissionPO } from '../role/domain/po/permission.po';
import { UserRepository } from './domain/repository/user.repository';
import { UserFactory } from './domain/user.factory';
import { UserDomainService } from './domain/user.domain.service';
import { UserService } from './domain/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserPO, RolePO, PermissionPO])],
  controllers: [UserController],
  providers: [UserService, UserDomainService, UserFactory, UserRepository],
  exports: [UserService],
})
export class UserModule {}
