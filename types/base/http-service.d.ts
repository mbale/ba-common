/// <reference types="winston" />
import { AxiosInstance } from 'axios';
import ExtendoError from 'extendo-error';
import { LoggerInstance } from 'winston';
/**
 * If connection to microservice is not available
 *
 * @export
 * @class MicroserviceError
 * @extends {ExtendoError}
 */
export declare class MicroserviceError extends ExtendoError {
    serviceName: string;
    serviceURL: string;
    /**
     * Creates an instance of MicroserviceError.
     * @param {string} serviceName
     * @param {string} serviceURL
     * @memberof MicroserviceError
     */
    constructor(serviceName: string, serviceURL: string);
}
/**
 * Default base class for each service communicator
 *
 * @abstract
 * @class HTTPService
 */
declare abstract class HTTPService {
    protected serviceName: string;
    protected axiosInstance: AxiosInstance;
    protected logger: LoggerInstance;
    constructor(serviceName: string, axiosInstance: AxiosInstance, logger: LoggerInstance);
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
