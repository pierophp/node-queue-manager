import { QueueAbstract } from '../../src/queue.abstract';

export class ExampleQueue extends QueueAbstract {
  public getName(): string {
    return 'example.queue';
  }

  public async run(data?: any): Promise<any> {
    return 'example.queue.run';
  }

  public getConcurrency(): number {
    return 3;
  }
}
