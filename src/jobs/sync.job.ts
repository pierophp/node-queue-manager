import { JobInterface } from '../contracts/job.interface';
import { QueueAbstract } from '../queue.abstract';
import { JobAbstract } from './job.abstract';
import { JobResponse } from './job.response';
import { QueueManagerOptions } from '../queue.manager.options';

export class SyncJob extends JobAbstract implements JobInterface {

  constructor(options: QueueManagerOptions) {
    super(options);
  }

  public async publish(queue: QueueAbstract): Promise<JobResponse> {

    await queue.run();

    return new JobResponse({ id: null, queue });
  }

  public async listen(queue: QueueAbstract, callback?: Function): Promise<any> {

  }

  public async close(): Promise<any> {

  }
}
