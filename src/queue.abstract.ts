export abstract class QueueAbstract {

  protected data: object = {};

  public setData(data: object) {
    this.data = data;
  }

  public getData(): object {
    return this.data;
  }

  public abstract getName(): string;

  public abstract async run(data?: any): Promise<any>;

  public getConcurrency(): number {
    return 1;
  }
}
