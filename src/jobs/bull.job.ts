import * as Bull from 'bull';
import { JobInterface } from '../contracts/job.interface';
import { QueueAbstract } from '../queue.abstract';
import { JobAbstract } from './job.abstract';
import { JobResponse } from './job.response';
import { RedisNotConfiguredError } from '../errors/redis.not.configured.error';
import { QueueManagerOptions } from '../queue.manager.options';

const instances = {};

export class BullJob extends JobAbstract implements JobInterface {
  protected closed: boolean = false;

  constructor(options: QueueManagerOptions) {
    super(options);
  }

  protected getInstance(name: string): any {
    if (instances[name]) {
      return instances[name];
    }

    if (!this.options.redis) {
      throw new RedisNotConfiguredError();
    }

    const bullQueue = new Bull(name, {
      redis: {
        port: this.options.redis.port,
        host: this.options.redis.host,
      },
    });

    instances[name] = bullQueue;

    return bullQueue;
  }

  public async publish(queue: QueueAbstract): Promise<JobResponse> {
    const bullQueue = this.getInstance(queue.getName());
    const bullJobReponse = await bullQueue.add(queue.getData());

    return new JobResponse({ id: bullJobReponse.id, queue });
  }

  public async listen(queue: QueueAbstract, callback?: Function): Promise<any> {
    const bullQueue = this.getInstance(queue.getName());
    return new Promise((done) => {
      bullQueue.process(queue.getConcurrency(), async (job, jobDone) => {
        queue.setData(job.data);
        await queue.run();
        if (callback) {
          callback(new JobResponse({ id: job.id, queue }));
        }

        jobDone();
      });

      const interval = setInterval(() => {
        if (this.closed) {
          done();
          clearInterval(interval);
        }
      }, 1000);
    });
  }

  public async close(): Promise<any> {
    for (const instance of Object.keys(instances)) {
      await instances[instance].close();
    }

    this.closed = true;
  }
}
