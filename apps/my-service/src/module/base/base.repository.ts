import { ClassConstructor, plainToInstance } from 'class-transformer';
import { FindOperator, FindOptionsWhere, Not, Repository } from 'typeorm';
import { IRepository } from './IRepository';
import { IDataListResponse } from './IDataListResponse';

export abstract class BaseRepository<PO extends { id: number }>
  implements IRepository<PO>
{
  constructor(protected repository: Repository<PO>) {}

  transformDO2PO(cls: ClassConstructor<PO>, plain: object): PO {
    return plainToInstance(cls, plain);
  }

  save(po: PO): Promise<PO> {
    return this.repository.save(po);
  }

  findOne(params: FindOptionsWhere<PO>): Promise<PO> {
    return this.repository.findOneBy(params);
  }

  abstract findMany(
    params: FindOptionsWhere<PO>,
  ): Promise<IDataListResponse<PO[]>>;

  private getFindOptionsWhere(
    params: FindOptionsWhere<PO>,
  ): FindOptionsWhere<PO> {
    const { id, ...restParam } = params;
    const where: FindOptionsWhere<Partial<Omit<PO, 'id'>>> & {
      id?: FindOperator<number>;
    } = {
      ...restParam,
    };
    id && (where.id = Not(id));
    return where;
  }

  checkExist(params: FindOptionsWhere<PO>): Promise<boolean> {
    const where = this.getFindOptionsWhere(params);
    return this.repository.exist({ where });
  }
}
