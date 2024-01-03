import { Injectable } from '@nestjs/common';

@Injectable()
export class LibService {
  libTest() {
    return 'Hello lib';
  }
}
