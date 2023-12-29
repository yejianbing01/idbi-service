import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyCacheModule } from './cache/cache.module';
import { LoginGuard } from './lib/login.guard';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { MyToolModule } from './module/tool/tool.module';
import { TaskModule } from './module/task/task.module';
import { ShortUrlModule } from './module/shortUrl/short-url.module';
import { EventSourceModule } from './module/event-source/event-source.module';

@Module({
  imports: [
    MyCacheModule,
    UserModule,
    AuthModule,
    TaskModule,
    MyToolModule.register({ name: 'idbi' }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m', // 有效期30分钟
          },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database_common'),
          synchronize: true,
          logging: false,
          autoLoadEntities: true,
          poolSize: 10,
          connectorPackage: 'mysql2',
          // timezone: '+08:00',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn:
              configService.get('jwt_access_token_expires_time') || '30m', // 有效期30分钟
          },
        };
      },
    }),
    ShortUrlModule,
    EventSourceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
