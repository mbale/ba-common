/// <reference types="winston" />
import { ConnectionManager } from 'typeorm';
import { LoggerInstance } from 'winston';
declare abstract class HTTPController {
    protected logger: LoggerInstance;
    protected connectionManager: ConnectionManager;
    constructor(logger: LoggerInstance, connectionManager: ConnectionManager);
}
export default HTTPController;
