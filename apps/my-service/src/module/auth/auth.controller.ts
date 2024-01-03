import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './domain/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { BusinessException } from 'lib/business.exception';

interface QrCodeInfo {
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    userId: number;
  };
}

@Controller('auth')
export class AuthController {
  private qrcodeMap = new Map<string, QrCodeInfo>();

  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/refresh')
  refresh(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('/captcha')
  async sendCaptcha(@Query('email') email: string) {
    return this.authService.sendCaptcha(email);
  }

  @Get('qrcode/generate')
  async generateQRcode() {
    const uuid = randomUUID();
    const dataUrl = await qrcode.toDataURL(
      `http://127.0.0.1:5173/#/confirm-login?id=${uuid}`,
    );
    this.qrcodeMap.set(uuid, { status: 'noscan' });
    return {
      qrcode_id: uuid,
      img: dataUrl,
    };
  }

  @Get('qrcode/check')
  async check(@Query('id') id: string) {
    return this.qrcodeMap.get(id);
  }

  @Get('qrcode/scan')
  async scan(@Query('id') id: string) {
    const info = this.qrcodeMap.get(id);
    if (!info) {
      BusinessException.throw('二维码已过期');
    }
    info.status = 'scan-wait-confirm';
    return 'success';
  }

  @Get('qrcode/confirm')
  async confirm(@Query('id') id: string) {
    const info = this.qrcodeMap.get(id);
    if (!info) {
      BusinessException.throw('二维码已过期');
    }
    info.status = 'scan-confirm';
    return 'success';
  }

  @Get('qrcode/cancel')
  async cancel(@Query('id') id: string) {
    const info = this.qrcodeMap.get(id);
    if (!info) {
      BusinessException.throw('二维码已过期');
    }
    info.status = 'scan-cancel';
    return 'success';
  }
}
