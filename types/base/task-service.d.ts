/// <reference types="winston" />
/// <reference types="bull" />
import { LoggerInstance } from 'winston';
import { Queue as IQueue } from 'bull';
export declare enum IdentifierTypes {
    Pinnacle = "pinnacle",
    Oddsgg = "oddsgg",
    Mediawiki = "mediawiki",
}
export interface IdentifierHandler {
    identifier: IdentifierTypes;
    handler: string;
}
declare abstract class TaskService {
    protected logger: LoggerInstance;
    protected queueStore: Map<string, IQueue>;
    protected handlerStore: Map<string, IdentifierHandler[]>;
    constructor(logger: LoggerInstance, queueStore: Map<string, IQueue>, handlerStore: Map<string, IdentifierHandler[]>);
}
export default TaskService;
