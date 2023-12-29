import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { generateRandomBase62Str } from 'src/lib/utils';
import { EntityManager } from 'typeorm';
import { UniqueCode } from './entities/UniqueCode';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ShortLongMap } from './entities/ShortLongMap';
import { BusinessException } from 'src/lib/business.exception';

@Injectable()
export class ShortUrlService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  private async generateCode() {
    const str = generateRandomBase62Str(6);
    const codeExisted = await this.entityManager.exists(UniqueCode, {
      where: { code: str },
    });

    if (codeExisted) return this.generateCode();

    const uniqueCode = new UniqueCode();
    uniqueCode.code = str;
    uniqueCode.status = 0;
    return await this.entityManager.insert(UniqueCode, uniqueCode);
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  private async batchGenerateCode() {
    for (let i = 0; i < 10000; i++) {
      await this.generateCode();
    }
  }

  async generateSortUrl(longUrl: string) {
    let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      status: 0,
    });
    if (!uniqueCode) {
      uniqueCode = await this.generateCode();
    }
    const shortLongMap = new ShortLongMap();
    shortLongMap.shortUrl = uniqueCode.code;
    shortLongMap.longUrl = longUrl;
    await this.entityManager.insert(ShortLongMap, shortLongMap);
    await this.entityManager.update(
      UniqueCode,
      { id: uniqueCode.id },
      { status: 1 },
    );
    return shortLongMap.shortUrl;
  }

  async getLongUrl(shortUrl: string) {
    const shortLongMap = await this.entityManager.findOneBy(ShortLongMap, {
      shortUrl,
    });
    if (!shortLongMap) {
      BusinessException.throw('短链不存在');
    }
    return shortLongMap.longUrl;
  }
}
