import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    const cronJobs = this.schedulerRegistry.getCronJobs();
    console.log(cronJobs.keys());
  }

  //   @Timeout(5000)
  handleTimeout() {
    console.log('timeout task execute...');
  }

  //   @Interval(5000)
  handleInterval() {
    console.log('interval task execute...');
  }

  //   */5 * * * * *
  createCronJob(name: string, cronTime: string, type: TaskTypeEnum) {
    const fn = this.jobExecutes[type];
    const cronJob = new CronJob(cronTime, () => {
      fn('1');
    });
    this.schedulerRegistry.addCronJob(name, cronJob);
    cronJob.start();
  }
}
