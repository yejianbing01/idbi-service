import { BadRequestException, ParseIntPipe } from '@nestjs/common';
import * as crypto from 'crypto';
import * as base62 from 'base62/lib/ascii';

export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export function generateParseIntPipe(name: string) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(name + ' 应该传数字');
    },
  });
}

/**
 * 生成base62编码的字符串
 * @param num 字符串长度
 * @returns
 */
export function generateRandomBase62Str(num: number) {
  const base62StrList = Array.from({ length: num }).map(() =>
    base62.encode(Math.floor(Math.random() * 62)),
  );
  return base62StrList.join('');
}
