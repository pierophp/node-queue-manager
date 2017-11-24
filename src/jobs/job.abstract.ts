import { QueueManagerOptions } from '../queue.manager.options';

export abstract class JobAbstract {
  protected options: QueueManagerOptions;
  constructor(options: QueueManagerOptions) {
    this.options = options;
  }
}
