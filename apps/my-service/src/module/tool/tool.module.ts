import { DynamicModule, Global, Module } from '@nestjs/common';
import { ToolEmailService } from './tool-email.service';

export type EmailOption = { name: string };

@Global()
@Module({
  // providers: [ToolEmailService],
  // exports: [ToolEmailService],
})
export class MyToolModule {
  static register(options: EmailOption): DynamicModule {
    return {
      module: MyToolModule,
      providers: [
        ToolEmailService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [ToolEmailService],
    };
  }
}
