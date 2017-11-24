import { JobInterface } from './contracts/job.interface';
import { QueueAbstract } from './queue.abstract';
import { QueueManagerOptions } from './queue.manager.options';
import { JobResponse } from './jobs/job.response';
export declare class QueueManager {
    protected job: JobInterface;
    protected options: QueueManagerOptions;
    protected defaultOptions: {
        redis: {
            port: number;
        };
        type: string;
    };
    constructor(queueManagerOptions?: QueueManagerOptions);
    protected mergeOptions(options: QueueManagerOptions): QueueManagerOptions;
    publish(queue: QueueAbstract): Promise<JobResponse>;
    listen(queue: QueueAbstract, callback?: Function): Promise<void>;
    close(): Promise<void>;
}
