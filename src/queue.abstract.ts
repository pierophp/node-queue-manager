export abstract class QueueAbstract {

  protected data: any = {};

  public setData(data: any) {
    this.data = data;
  }

  public getData(): any {
    return this.data;
  }

  public abstract getName(): string;

  public abstract async run(data?: any): Promise<any>;

  public getConcurrency(): number {
    return 1;
  }
}
