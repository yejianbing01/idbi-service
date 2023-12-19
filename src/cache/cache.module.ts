import type { RedisClientOptions } from 'redis';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheService],
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          store: redisStore,
          socket: {
            host: configService.get('redis_server_host'),
            port: configService.get('redis_server_port'),
          },
          database: 1,
        } as RedisClientOptions;
      },
    }),
  ],
  exports: [CacheService],
})
export class MyCacheModule {}
