import { ClassConstructor, plainToInstance } from 'class-transformer';

export class BaseDO {
  static create<T>(cls: ClassConstructor<T>, plain: object) {
    return plainToInstance(cls, plain);
  }
}
