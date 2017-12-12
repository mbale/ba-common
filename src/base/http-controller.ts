import { ConnectionManager } from 'typeorm/connection/ConnectionManager';
import { inject, injectable, optional } from 'inversify';
import { LoggerInstance } from 'winston';

@injectable()
abstract class HTTPController {
  constructor(
    @inject('logger') protected logger: LoggerInstance,
    @inject(ConnectionManager) @optional() protected connection: ConnectionManager,
  ) {}
}

export default HTTPController;
