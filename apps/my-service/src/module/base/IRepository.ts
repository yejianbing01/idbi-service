import { FindOptionsWhere } from 'typeorm';
import { IDataListResponse } from './IDataListResponse';

export interface IRepository<PO> {
  save(po: PO): Promise<PO>;
  findMany(params: FindOptionsWhere<PO>): Promise<IDataListResponse<PO[]>>;
  findOne(params: FindOptionsWhere<PO>): Promise<PO>;
  checkExist(params: FindOptionsWhere<PO>): Promise<boolean>;
}

export type PartPO<PO> = { [P in keyof PO]: PO[P] };
