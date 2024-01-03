import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';

@Controller('s')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get()
  async generateShortUrl(@Query('url') longUrl: string) {
    return this.shortUrlService.generateSortUrl(longUrl);
  }

  @Get(':code')
  @Redirect()
  async jump(@Param('code') shortUrl: string) {
    const longUrl = await this.shortUrlService.getLongUrl(shortUrl);
    return {
      url: longUrl,
      statusCode: 302,
    };
  }
}
