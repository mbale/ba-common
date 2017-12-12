/// <reference types="winston" />
import { ConnectionManager } from 'typeorm/connection/ConnectionManager';
import { LoggerInstance } from 'winston';
declare abstract class HTTPController {
    protected logger: LoggerInstance;
    protected connection: ConnectionManager;
    constructor(logger: LoggerInstance, connection: ConnectionManager);
}
export default HTTPController;
