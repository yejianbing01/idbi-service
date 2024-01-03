import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storage, uploadPath } from './lib/statics-asserts';
import { ClientGrpc, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
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

  @Inject('BOOK_PACKAGE')
  private client: ClientGrpc;

  private bookService: BookService;

  onModuleInit() {
    this.bookService = this.client.getService('BookService');
  }

  @Get('book/:id')
  getHero(@Param('id') id: number) {
    return this.bookService.findBook({
      id,
    });
  }
}
