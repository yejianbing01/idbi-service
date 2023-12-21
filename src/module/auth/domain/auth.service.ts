import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/module/user/domain/user.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private cacheService: CacheService,
  ) {}

  async register(@Body() registerUserDto: RegisterUserDto) {
    const cacheCaptcha = await this.cacheService.get<{ captcha: string }>(
      registerUserDto.email,
    );
    if (!cacheCaptcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }
    if (cacheCaptcha.captcha !== registerUserDto.captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }
    await this.userService.create(registerUserDto);
    return '注册成功';
  }
}
