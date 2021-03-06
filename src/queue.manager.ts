import { merge } from 'lodash';
import { JobInterface } from './contracts/job.interface';
import { QueueAbstract } from './queue.abstract';
import { QueueManagerOptions } from './queue.manager.options';
import { BullJob } from './jobs/bull.job';
import { SyncJob } from './jobs/sync.job';
import { JobResponse } from './jobs/job.response';

const jobTypes = {
  bull: BullJob,
  sync: SyncJob,
};

export class QueueManager {
  protected job: JobInterface;
  protected options: QueueManagerOptions;
  protected defaultOptions = {
    redis: {
      port: 6379,
    },
    type: 'bull',
  };

  constructor(queueManagerOptions?: QueueManagerOptions) {
    if (!queueManagerOptions) {
      queueManagerOptions = new QueueManagerOptions();
    }

    queueManagerOptions = this.mergeOptions(queueManagerOptions);

    this.options = queueManagerOptions;

    const jobName: string = queueManagerOptions.type || this.defaultOptions.type;

    this.job = new jobTypes[jobName](queueManagerOptions);
  }

  protected mergeOptions(options: QueueManagerOptions): QueueManagerOptions {
    return merge(new QueueManagerOptions(), this.defaultOptions, options);
  }

  public async publish(queue: QueueAbstract): Promise<JobResponse> {
    return await this.job.publish(queue);
  }

  public async listen(queue: QueueAbstract, callback?: Function): Promise<void> {
    await this.job.listen(queue, callback);
  }

  public async listenAll(queues: QueueAbstract[], callback?: Function): Promise<void> {
    await this.job.listenAll(queues, callback);
  }

  public async close(): Promise<void> {
    await this.job.close();
  }
}
