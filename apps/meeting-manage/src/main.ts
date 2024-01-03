import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MeetingManageModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatAllExceptionsFilter } from 'lib/format-all-exception.filter';
import { FormatBusinessExceptionFilter } from 'lib/format-business-exception.filter';
import { FormatSuccessResponseFilter } from 'lib/format-success-response.filter';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(MeetingManageModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FormatAllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalFilters(new FormatBusinessExceptionFilter());
  app.useGlobalInterceptors(new FormatSuccessResponseFilter());

  await app.listen(3100);
}
bootstrap();

async function gRPCBootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(
    MeetingManageModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:3108',
        package: 'book',
        protoPath: join(__dirname, '../../../config/book/book.proto'),
      },
    },
  );
  await app.listen();
}
gRPCBootstrap();
