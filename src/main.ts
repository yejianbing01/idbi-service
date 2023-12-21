import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatExceptionResponseFilter } from './lib/format-exception-response.filter';
import { FormatSuccessResponseFilter } from './lib/format-success-response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FormatExceptionResponseFilter());
  app.useGlobalInterceptors(new FormatSuccessResponseFilter());

  await app.listen(3000);
}
bootstrap();
