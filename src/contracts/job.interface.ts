import { QueueAbstract } from '../queue.abstract';
import { JobResponse } from '../jobs/job.response';

export interface JobInterface {
  publish(queue: QueueAbstract): Promise<JobResponse>;

  listen(queue: QueueAbstract, callback?: Function): Promise<any>;

  close(): Promise<any>;
}
