import { expect } from 'chai';
import { QueueManager } from '../../src/queue.manager';
import { ExampleQueue } from '../queues/example.queue';

describe('SyncJobTest', function () {
  this.timeout(5000);

  const queueManager = new QueueManager({
    type: 'sync',
  });

  it('publish', async () => {
    const exampleQueue = new ExampleQueue();
    exampleQueue.setData({
      name: 'test',
    });
    const queueResponse: any = await queueManager.publish(exampleQueue);
    expect(queueResponse.queue.queueExecuted).not.null;

  });
});
