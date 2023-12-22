import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/module/user/domain/user.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { CacheService } from 'src/cache/cache.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { md5 } from 'src/lib/utils';
import { ToolEmailService } from 'src/module/tool/tool-email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private cacheService: CacheService,
    private jwtService: JwtService,
    private toolEmailService: ToolEmailService,
    private configService: ConfigService<Config_jwt>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const cacheCaptcha = await this.cacheService.get<string>(
      registerUserDto.email,
    );

    if (!cacheCaptcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }
    if (cacheCaptcha !== registerUserDto.captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }
    await this.userService.create(registerUserDto);
    return '注册成功';
  }

  async login(loginUserDto: LoginUserDto) {
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

  async refreshToken(refreshToken: string) {
    try {
      const data = this.jwtService.verify<{ id: number }>(refreshToken);

      const user = await this.userService.getUser({ id: data.id });

      const access_token = this.jwtService.sign(user);

      const refresh_token = this.jwtService.sign(user, {
        expiresIn:
          this.configService.get('jwt_refresh_token_expres_time') || '7d',
      });

      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  /**
   * 发送验证码
   * @param email
   * @returns
   */
  async sendCaptcha(email: string) {
    const code = Math.random().toString().slice(2, 8);
    await this.cacheService.set(email, code, 5 * 60);

    await this.toolEmailService.sendMail({
      to: email,
      subject: '注册验证码',
      html: `<p>您的注册验证码是 ${code} , 5分钟内有效<p>`,
    });
    return '验证码发送成功';
  }
}
