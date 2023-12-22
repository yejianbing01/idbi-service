import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(response: string | Record<string, any>) {
    super(response, HttpStatus.BAD_REQUEST);
  }

  static throw(response: string | Record<string, any>) {
    throw new BusinessException(response);
  }
}
