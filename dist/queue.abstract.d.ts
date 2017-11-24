export declare abstract class QueueAbstract {
    abstract getName(): string;
    abstract run(data?: any): Promise<any>;
    getConcurrency(): number;
    getData(): any;
}
