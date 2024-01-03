import { NestFactory } from '@nestjs/core';
import { MeetingManageModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(MeetingManageModule);
  await app.listen(3100);
}
bootstrap();
