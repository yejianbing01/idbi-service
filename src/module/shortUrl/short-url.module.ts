import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueCode } from './entities/UniqueCode';
import { ShortLongMap } from './entities/ShortLongMap';

@Module({
  imports: [TypeOrmModule.forFeature([UniqueCode, ShortLongMap])],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule {}
