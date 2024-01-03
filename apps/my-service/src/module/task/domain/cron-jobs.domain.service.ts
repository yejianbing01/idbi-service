import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';

@Injectable()
export class CronJobsDomainService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  createCronJob(name: string, cronJob: CronJob) {
    this.schedulerRegistry.addCronJob(name, cronJob);
  }

  updateCronJob(name: string, time: string) {
    const cronJob = this.schedulerRegistry.getCronJob(name);
    cronJob.setTime(new CronTime(time));
  }

  startCronJob(name: string) {
    const cronJob = this.schedulerRegistry.getCronJob(name);
    if (!cronJob) return;
    cronJob.start();
  }

  stopCronJob(name: string) {
    const cronJob = this.schedulerRegistry.getCronJob(name);
    if (!cronJob) return;
    cronJob.stop();
  }

  deleteCronJob(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // handleCron() {
  //   const cronJobs = this.schedulerRegistry.getCronJobs();
  //   console.log(cronJobs.keys());
  // }

  //   @Timeout(5000)
  // handleTimeout() {
  //   console.log('timeout task execute...');
  // }

  //   @Interval(5000)
  // handleInterval() {
  //   console.log('interval task execute...');
  // }
}
