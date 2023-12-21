import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolePO } from '../../../role/domain/po/role.po';

@Entity({
  name: 'users',
})
export class UserPO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
    unique: true,
  })
  username: string;

  @Column({
    length: 50,
    unique: true,
    comment: '昵称',
  })
  nickname: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    length: 50,
    comment: '邮箱',
  })
  email: string;

  @Column({
    length: 100,
    nullable: true,
    comment: '头像',
  })
  headPic: string;

  @Column({
    length: 20,
    nullable: true,
    comment: '手机号',
  })
  phoneNumber: string;

  @Column({
    comment: '是否停用',
    default: false,
  })
  disabled: boolean;

  @Column({
    comment: '是否是管理员',
    default: false,
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => RolePO)
  @JoinTable({
    name: 'user_roles',
  })
  roles: RolePO[];

  constructor(userPO: Partial<UserPO>) {
    Object.assign(this, userPO);
  }

  /**
   * 创建用户
   */
  static create(userPO: Partial<UserPO>) {
    return new UserPO(userPO);
  }

  /**
   * 更新用户
   */
  update(userPO: Partial<UserPO>) {
    Object.assign(this, userPO);
    return this;
  }
}
