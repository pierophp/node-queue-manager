import { QueueManagerOptions } from '../queue.manager.options';
import { QueueAbstract } from '../queue.abstract';

export abstract class JobAbstract {
  protected options: QueueManagerOptions;
  constructor(options: QueueManagerOptions) {
    this.options = options;
  }

  public abstract async listen(queues: QueueAbstract, callback?: Function);

  public async listenAll(queues: QueueAbstract[], callback?: Function) {
    const queuesPromises: Promise<QueueAbstract>[] = [];
    for (const queue of queues) {
      queuesPromises.push(this.listen(queue, callback));
    }

    await Promise.all(queuesPromises);
  }
}
