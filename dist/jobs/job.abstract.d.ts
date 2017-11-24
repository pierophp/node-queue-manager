import { QueueManagerOptions } from '../queue.manager.options';
export declare abstract class JobAbstract {
    protected options: QueueManagerOptions;
    constructor(options: QueueManagerOptions);
}
