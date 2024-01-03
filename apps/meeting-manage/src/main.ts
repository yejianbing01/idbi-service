import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MeetingManageModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatAllExceptionsFilter } from 'lib/format-all-exception.filter';
import { FormatBusinessExceptionFilter } from 'lib/format-business-exception.filter';
import { FormatSuccessResponseFilter } from 'lib/format-success-response.filter';

async function bootstrap() {
  const app = await NestFactory.create(MeetingManageModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FormatAllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalFilters(new FormatBusinessExceptionFilter());
  app.useGlobalInterceptors(new FormatSuccessResponseFilter());

  await app.listen(3100);
}
bootstrap();
