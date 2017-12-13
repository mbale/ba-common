import { ConnectionManager } from 'typeorm';
import { inject, injectable, optional } from 'inversify';
import { LoggerInstance } from 'winston';

@injectable()
abstract class HTTPController {
  constructor(
    @inject('logger') protected logger: LoggerInstance,
    @inject('connectionmanager') @optional() protected connectionManager: ConnectionManager,
  ) {}
}

export default HTTPController;
