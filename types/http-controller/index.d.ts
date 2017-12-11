/// <reference types="winston" />
import { LoggerInstance } from 'winston';
import { ConnectionManager } from 'typeorm/connection/ConnectionManager';
declare abstract class HTTPController {
    protected logger: LoggerInstance;
    protected connection: ConnectionManager;
    constructor(logger: LoggerInstance, connection: ConnectionManager);
}
export default HTTPController;
