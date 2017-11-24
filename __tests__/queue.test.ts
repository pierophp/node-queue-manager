import { expect } from 'chai';
import { QueueManager } from '../src/queue.manager';
import { ExampleQueue } from './queues/example.queue';

describe('QueueTest', function () {
  this.timeout(5000);

  const queueManager = new QueueManager({
    redis: {
      host: 'redis',
    },
    type: 'Bull',
  });
  it('publish', async () => {
    const exampleQueue = new ExampleQueue();
    const queueResponse = await queueManager.publish(exampleQueue);
    expect(queueResponse.id).not.null;
    await queueManager.listen(exampleQueue, (queueExecutedResponse) => {
      expect(queueResponse.id).to.equal(queueExecutedResponse.id);
      queueManager.close();
    });
  });
});
