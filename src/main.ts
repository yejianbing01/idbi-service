import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatExceptionResponseFilter } from './lib/format-exception-response.filter';
import { FormatSuccessResponseFilter } from './lib/format-success-response.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { registerStaticAsserts } from './lib/statics-asserts';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FormatExceptionResponseFilter());
  app.useGlobalInterceptors(new FormatSuccessResponseFilter());

  registerStaticAsserts(app);

  await app.listen(3000);
}
bootstrap();
