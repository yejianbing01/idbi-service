import { SetMetadata } from '@nestjs/common';

/** 需登录装饰器 */
export const RequireLogin = () =>
  SetMetadata<MetaDataKey, boolean>('require-login', true);
