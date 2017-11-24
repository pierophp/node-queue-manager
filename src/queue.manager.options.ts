export class QueueManagerOptions {
  public redis?: {
    port?: number,
    host: string,
  };

  public type: 'Bull';
}
