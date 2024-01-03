import { md5 } from 'apps/my-service/src/lib/utils';
import { BaseDO } from '../../base/base.entity';
import { RoleDO } from '../../role/domain/role.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UserDO extends BaseDO {
  private id: number;
  private username: string;
  private nickname: string;
  private password: string;
  private email: string;
  private headPic: string;
  private phoneNumber: string;

  private disabled: boolean;
  private isAdmin: boolean;

  private createTime?: string;
  private updateTime?: Date;
  private roles?: RoleDO[];

  /**
   * 密码加密
   * @returns
   */
  md5Password() {
    this.password = md5(this.password);
    return this;
  }

  /**
   * 更新用户
   * @param updateUserDto
   * @returns
   */
  update(updateUserDto: UpdateUserDto) {
    this.email = updateUserDto.email;
    this.headPic = updateUserDto.headPic;
    this.nickname = updateUserDto.nickname;
    return this;
  }

  /**
   * 停用
   * @returns
   */
  disable() {
    this.disabled = true;
    return this;
  }

  /**
   * 启用
   * @returns
   */
  enable() {
    this.disabled = false;
    return this;
  }
}
