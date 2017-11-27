import { QueueAbstract } from '../queue.abstract';

export class JobResponse {
  public id: number | string;

  public queue: QueueAbstract;

  constructor(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}
