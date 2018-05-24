import { inject, optional, injectable } from 'inversify';
import { HTTPService } from '../index';
import { MatchSourceType } from './match-http-service';
import { LoggerInstance } from 'winston';
import { Queue as IQueue } from 'bull';

export enum IdentifierTypes {
  Pinnacle = 'pinnacle',
  Oddsgg = 'oddsgg',
  Mediawiki = 'mediawiki',
}

export interface IdentifierHandler {
  identifier: IdentifierTypes;
  handler: string;
}

@injectable()
abstract class TaskService {
  constructor(
    @inject('logger') protected logger: LoggerInstance,
    @inject('queuestore') protected queueStore: Map<string, IQueue>,
    @inject('handlerstore') protected handlerStore: Map<string, IdentifierHandler[]>,
  ) {
    this.logger.info('Tieing queues and handlers');
    this.logger.info('Queue names:');
    this.queueStore.forEach((queue, queuename) => this.logger.info(queuename));
  
    this.logger.info('Queue handlers:');
    this.handlerStore.forEach((handlers, queuename) => {
      handlers.forEach((identifierObj) => {
        // check if it has the correct queuename
        if (queueStore.has(queuename)) {
          queueStore.get(queuename)
            .process(identifierObj.identifier, job => this[identifierObj.handler](job));
          this.logger.info(`identifier: ${identifierObj.identifier}`);
          this.logger.info(`handler: ${identifierObj.handler}`);
        }
      });
    });
  }
}

export default TaskService;
