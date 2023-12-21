import { ClassConstructor, plainToInstance } from 'class-transformer';
import { FindOperator, FindOptionsWhere, Not } from 'typeorm';

export abstract class BaseRepository<T extends { id: number }> {
  transformDO2PO(cls: ClassConstructor<T>, plain: object): T {
    return plainToInstance(cls, plain);
  }

  getFindOptionsWhere(params: FindOptionsWhere<T>): FindOptionsWhere<T> {
    const { id, ...restParam } = params;
    const where: FindOptionsWhere<Partial<Omit<T, 'id'>>> & {
      id?: FindOperator<number>;
    } = {
      ...restParam,
    };
    id && (where.id = Not(id));
    return where;
  }
}
