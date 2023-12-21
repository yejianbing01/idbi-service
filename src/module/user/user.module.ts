import { Module } from '@nestjs/common';
import { UserController } from 'src/module/user/user.controller';
import { UserService } from 'src/module/user/domain/user.service';
import { UserDomainService } from 'src/module/user/domain/user.domain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPO } from './domain/repository/user.po';
import { RolePO } from '../role/domain/po/role.po';
import { PermissionPO } from '../role/domain/po/permission.po';
import { UserRepository } from './domain/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserPO, RolePO, PermissionPO])],
  controllers: [UserController],
  providers: [UserService, UserDomainService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
