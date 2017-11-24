export abstract class QueueAbstract {
  public abstract getName(): string;

  public abstract async run(data?: any): Promise<any>;

  public getConcurrency(): number {
    return 1;
  }

  public getData(): any {
    return {};
  }
}
