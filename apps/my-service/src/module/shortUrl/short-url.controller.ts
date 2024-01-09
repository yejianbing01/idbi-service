import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import type { Response } from 'express';

@Controller('s')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get()
  async generateShortUrl(@Query('url') longUrl: string) {
    return this.shortUrlService.generateSortUrl(longUrl);
  }

  @Get(':code')
  async jump(@Param('code') shortUrl: string, @Res() res: Response) {
    const longUrl = await this.shortUrlService.getLongUrl(shortUrl);
    return res.status(302).redirect(longUrl);
  }
}
