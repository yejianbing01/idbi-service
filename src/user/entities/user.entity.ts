import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({
    length: 50,
    comment: '用户名',
    unique: true,
  })
  private username: string;

  @Column({
    length: 50,
    unique: true,
    comment: '昵称',
  })
  private nickname: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  private password: string;

  @Column({
    length: 50,
    comment: '邮箱',
  })
  private email: string;

  @Column({
    length: 100,
    nullable: true,
    comment: '头像',
  })
  private headPic: string;

  @Column({
    length: 20,
    nullable: true,
    comment: '手机号',
  })
  private phoneNumber: string;

  @Column({
    comment: '是否冻结',
    default: false,
  })
  private isFrozen: boolean;

  @Column({
    comment: '是否是管理员',
    default: false,
  })
  private isAdmin: boolean;

  @CreateDateColumn()
  private createTime: string;

  @UpdateDateColumn()
  private updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];

  constructor(createUserDto: CreateUserDto) {
    this.username = createUserDto.username;
    this.nickname = createUserDto.nickname;
    this.password = createUserDto.password;
    this.email = createUserDto.email;
  }

  /**
   * 创建用户
   */
  static create(createUserDto: CreateUserDto) {
    return new User(createUserDto);
  }

  /**
   * 更新用户
   * @param updateUserDto
   * @returns
   */
  update(updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      this.email = updateUserDto.email;
    }
    if (updateUserDto.headPic) {
      this.headPic = updateUserDto.headPic;
    }
    if (updateUserDto.nickname) {
      this.nickname = updateUserDto.nickname;
    }
    return this;
  }
}
