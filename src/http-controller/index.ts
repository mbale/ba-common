import { LoggerInstance } from 'winston';
import { inject, injectable, optional } from 'inversify';
import { ConnectionManager } from 'typeorm/connection/ConnectionManager';

@injectable()
abstract class HTTPController {
  constructor(
    @inject('logger') protected logger: LoggerInstance,
    @inject(ConnectionManager) @optional() protected connection: ConnectionManager,
  ) {}
}

export default HTTPController;
