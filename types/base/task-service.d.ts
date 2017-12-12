/// <reference types="winston" />
/// <reference types="bull" />
import { MatchSourceType } from './match-http-service';
import { LoggerInstance } from 'winston';
import { Queue as IQueue } from 'bull';
export interface IdentifierHandler {
    identifier: MatchSourceType;
    handler: string;
}
declare abstract class TaskService {
    protected logger: LoggerInstance;
    protected queueStore: Map<string, IQueue>;
    protected handlerStore: Map<string, IdentifierHandler[]>;
    constructor(logger: LoggerInstance, queueStore: Map<string, IQueue>, handlerStore: Map<string, IdentifierHandler[]>);
}
export default TaskService;
