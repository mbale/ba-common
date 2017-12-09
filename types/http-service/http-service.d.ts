/// <reference types="winston" />
import { AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';
/**
 * Default base class for each service communicator
 *
 * @abstract
 * @class HTTPService
 */
declare abstract class HTTPService {
    protected axiosInstance: AxiosInstance;
    protected logger: LoggerInstance;
    constructor(axiosInstance: AxiosInstance, logger: LoggerInstance);
    /**
     * Checks if service's healthy
     *
     * @static
     * @returns {Promise<boolean>}
     * @memberof HTTPService
     */
    ping(): Promise<boolean>;
}
export default HTTPService;
