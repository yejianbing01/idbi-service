import { PermissionDO } from 'src/permission/domain/permission.entity';

export class RoleDO {
  private id: number;
  private name: string;
  private permissions: PermissionDO[];
}
