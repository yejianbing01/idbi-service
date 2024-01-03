import { plainToInstance } from 'class-transformer';
import { UserDO } from './user.entity';
import { UserPO } from './repository/user.po';
import { IFactory } from '../../base/IFactory';

export class UserFactory implements IFactory<UserDO, UserPO> {
  create(dto: Partial<UserDO>): UserDO {
    return plainToInstance(UserDO, dto);
  }

  rebuild(po: UserPO): UserDO {
    return plainToInstance(UserDO, po);
  }

  transformDO2PO(dO: UserDO): UserPO {
    return plainToInstance(UserPO, dO);
  }
}
