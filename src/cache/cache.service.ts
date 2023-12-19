import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache, Milliseconds } from 'cache-manager';

@Injectable()
export class CacheService {
  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: string | number, ttl?: Milliseconds) {
    await this.cacheManager.set(key, value, ttl);
  }
}
