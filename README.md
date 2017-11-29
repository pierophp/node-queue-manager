# Node Queue Manager

A simple node queue manager.

This project aims to make the queue management in node enviroment simpler.

## Providers

Type | Description
-----|------------
bull | [Bull](https://www.npmjs.com/package/bull)
sync | Useful to local development


## Example
All the examples are in Typescript, but this project also works with JS.

### Generating queue
You need generate a queue file.
```typescript
import { QueueAbstract } from 'node-queue-manager';

export class ExampleQueue extends QueueAbstract {

  public getName(): string {
    return 'example.queue';
  }

  public getConcurrency(): number { //This method is optional
    return 3; // Set the queue concurrency
  }

  public async run(data: string) {
    // My code here
    console.log('Running example queue');
  }
}

```
To generate a queue:
```typescript
import { QueueManager } from 'node-queue-manager';
import { ExampleQueue } from './example.queue';

const queueManager = new QueueManager({
  redis: {
    host: 'redis-host',
    port: 6379,
  },
  type: 'Bull',
});

const exampleQueue: ExampleQueue = new ExampleQueue();
renderQueue.setData({
  prop01: 'Test',
  prop02: 'Test 02'
});
const exampleQueue = await queueManager.publish(exampleQueue);
```

### Consuming queue
Consuming only one queue:

```typescript
import { QueueManager } from 'node-queue-manager';
import { ExampleQueue } from './example.queue';

const queueManager = new QueueManager({
  redis: {
    host: 'redis-host',
    port: 6379,
  },
  type: 'Bull',
});

await queueManager.listen(new ExampleQueue());
```

Consuming multiple queues:

```typescript
import { QueueManager } from 'node-queue-manager';
import { ExampleQueue } from './example.queue';
import { Example02Queue } from './example.02.queue';

const queueManager = new QueueManager({
  redis: {
    host: 'redis-host',
    port: 6379,
  },
  type: 'Bull',
});

await queueManager.listenAll([
  new ExampleQueue(),
  new Example02Queue(),
]);
```
