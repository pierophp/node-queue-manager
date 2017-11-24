import { JobInterface } from '../contracts/job.interface';
import { QueueAbstract } from '../queue.abstract';
import { JobAbstract } from './job.abstract';
import { JobResponse } from './job.response';
import { QueueManagerOptions } from '../queue.manager.options';
export declare class BullJob extends JobAbstract implements JobInterface {
    protected closed: boolean;
    constructor(options: QueueManagerOptions);
    protected getInstance(name: string): any;
    publish(queue: QueueAbstract): Promise<JobResponse>;
    listen(queue: QueueAbstract, callback?: Function): Promise<any>;
    close(): Promise<any>;
}
