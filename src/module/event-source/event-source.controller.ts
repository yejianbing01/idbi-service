import { Controller, Sse } from '@nestjs/common';
import { EventSourceService } from './event-source.service';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';
import { exec } from 'child_process';

@Controller('event-source')
export class EventSourceController {
  constructor(private readonly eventSourceService: EventSourceService) {}

  @Sse('stream')
  stream() {
    return new Observable((observer) => {
      observer.next({ data: { msg: 'aaa' } });
      setTimeout(() => {
        observer.next({ data: { msg: 'bbb' } });
      }, 2000);
      setTimeout(() => {
        observer.next({ data: { msg: 'ccc' } });
      }, 4000);
    });
  }

  @Sse('stream2')
  stream2() {
    const childProcess = exec('tail -f ./log');

    return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        observer.next({ data: { msg: msg.toString() } });
      });
    });
  }

  @Sse('stream3')
  stream3() {
    return new Observable((observer) => {
      const json = readFileSync('./package.json').toJSON();
      observer.next({ data: { msg: json } });
    });
  }
}
