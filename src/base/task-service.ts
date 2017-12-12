import { inject, optional, injectable } from 'inversify';
import { HTTPService } from '../index';
import { MatchSourceType } from './match-http-service';
import { LoggerInstance } from 'winston';
import { Queue as IQueue } from 'bull';

export interface IdentifierHandler {
  identifier: MatchSourceType;
  handler: string;
}

@injectable()
abstract class TaskService {
  constructor(
    @inject('logger') protected logger: LoggerInstance,
    @inject('queuestore') protected queueStore: Map<string, IQueue>,
    @inject('handlerstore') protected handlerStore: Map<string, IdentifierHandler[]>,
  ) {}
}

export default TaskService;
