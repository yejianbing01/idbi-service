import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storage, uploadPath } from './lib/statics-asserts';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @Inject('USER_SERVICE')
  private userClient: ClientProxy;

  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: uploadPath,
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname.toLocaleLowerCase());
        if (['.png', '.jpg', '.jpeg', '.gif'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @MessagePattern('sum')
  sum(numArr: number[]): number {
    return numArr.reduce((total, item) => total + item, 0);
  }

  @Get('sum')
  microTest(@Query('num') str: string) {
    const numArr = str.split(',').map((item) => parseInt(item));
    return this.userClient.send('sum', numArr);
  }
}
