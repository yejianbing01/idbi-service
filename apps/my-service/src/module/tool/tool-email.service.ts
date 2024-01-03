import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { EmailOption } from './tool.module';

interface SendMailProps {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class ToolEmailService {
  private transporter: Transporter;

  @Inject('CONFIG_OPTIONS')
  private options: EmailOption;

  constructor(private configService: ConfigService<Config_nodemailer>) {
    this.transporter = createTransport({
      host: this.configService.get('nodemailer_host'),
      port: this.configService.get('nodemailer_port'),
      secure: false,
      auth: {
        user: this.configService.get('nodemailer_auth_user'),
        pass: this.configService.get('nodemailer_auth_pass'),
      },
    });
  }

  async sendMail({ to, subject, html }: SendMailProps) {
    await this.transporter.sendMail({
      from: {
        name: this.options.name,
        address: this.configService.get('nodemailer_auth_user') || '',
      },
      to,
      subject,
      html,
    });
  }
}
