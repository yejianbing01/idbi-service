import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionPO } from './permission.po';

@Entity({
  name: 'roles',
})
export class RolePO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    comment: '角色名',
  })
  name: string;

  @ManyToMany(() => PermissionPO)
  @JoinTable({
    name: 'role_permissions',
  })
  permissions: PermissionPO[];
}
