import { ConnectionManager } from 'typeorm';
import { inject, injectable, optional } from 'inversify';
import { LoggerInstance } from 'winston';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request } from 'express';

@injectable()
abstract class HTTPController {
  constructor(
    @inject('logger') protected logger: LoggerInstance,
    @inject('connectionmanager') @optional() protected connectionManager: ConnectionManager,
  ) {}
}

export default HTTPController;

@Middleware({ type: 'before' })
@injectable()
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  constructor(
    @inject('logger') private logger: LoggerInstance,
  ) {} 
  use(request: Request, response: any, next: (err?: any) => any): void {
    this.logger.info(`
    headers: 
    ${request.rawHeaders.join()}
    method:
    ${request.method}
    url:
    ${request.url}
    query:
    ${JSON.stringify(request.query)}
    source:
    ${request.connection.remoteAddress}
    `);

    next();
  }
}

