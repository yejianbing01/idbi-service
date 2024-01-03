import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  // @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    const cronJobs = this.schedulerRegistry.getCronJobs();
    cronJobs.forEach((item) => {
      item.addCallback(() => {
        console.log('object');
      });
    });
  }

  //   @Timeout(5000)
  handleTimeout() {
    console.log('timeout task execute...');
  }

  //   @Interval(5000)
  handleInterval() {
    console.log('interval task execute...');
  }
}
