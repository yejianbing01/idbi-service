import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/module/user/domain/user.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { CacheService } from 'src/cache/cache.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { md5 } from 'src/lib/utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private cacheService: CacheService,
    private jwtService: JwtService,
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

  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.getUser({ email: loginUserDto.email });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== md5(loginUserDto.password)) {
      throw new HttpException('用户名或密码不正确', HttpStatus.BAD_REQUEST);
    }

    return {
      accessToken: this.jwtService.sign({ user }),
      refreshToken: this.jwtService.sign({ user }),
    };
  }
}
