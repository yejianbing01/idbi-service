import { RoleDO } from 'src/module/role/domain/role.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BaseDO } from 'src/module/base/base.entity';

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
