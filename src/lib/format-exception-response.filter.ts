import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class FormatExceptionResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.json({
      code: exception.getStatus(),
      message: 'fail',
      data:
        (exception.getResponse() as { message: string[] }).message ||
        exception.message,
    });
  }
}
