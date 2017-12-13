/// <reference types="winston" />
/// <reference types="express" />
import { ConnectionManager } from 'typeorm';
import { LoggerInstance } from 'winston';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request } from 'express';
declare abstract class HTTPController {
    protected logger: LoggerInstance;
    protected connectionManager: ConnectionManager;
    constructor(logger: LoggerInstance, connectionManager: ConnectionManager);
}
export default HTTPController;
export declare class LoggingMiddleware implements ExpressMiddlewareInterface {
    private logger;
    constructor(logger: LoggerInstance);
    use(request: Request, response: any, next: (err?: any) => any): void;
}
