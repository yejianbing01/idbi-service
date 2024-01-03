import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatBusinessExceptionFilter } from './lib/format-business-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { registerStaticAsserts } from './lib/statics-asserts';
import { FormatAllExceptionsFilter } from './lib/format-all-exception.filter';
import { FormatSuccessResponseFilter } from './lib/format-success-response.filter';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FormatAllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalFilters(new FormatBusinessExceptionFilter());
  app.useGlobalInterceptors(new FormatSuccessResponseFilter());

  registerStaticAsserts(app);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();

async function microBootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8888,
      },
    },
  );
  app.listen();
}
microBootstrap();
