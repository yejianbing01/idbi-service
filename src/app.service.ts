import { Inject, Injectable } from '@nestjs/common';
import { CacheService } from './cache/cache.service';

@Injectable()
export class AppService {
  @Inject(CacheService)
  private cacheMange: CacheService;

  getHello(name: string): string {
    console.log('hello', name);
    return 'Hello World!';
  }

  testCache() {
    return this.cacheMange.get('1');
  }

  testSetCache() {
    return this.cacheMange.set('2', 2, 60);
  }
}
