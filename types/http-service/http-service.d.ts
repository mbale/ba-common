import { AxiosInstance } from 'axios';
/**
 * Default base class for each service communicator
 *
 * @abstract
 * @class HTTPService
 */
declare abstract class HTTPService {
    /**
     * Contains root URL of service
     *
     * @static
     * @memberof HTTPService
     */
    static serviceBaseURL: string;
    static axiosInstance: AxiosInstance;
    /**
     * Initialize the core service with bootstrapped values
     * Needs to be called
     *
     * @static
     * @param {string} serviceBaseURL
     * @returns
     * @memberof HTTPService
     */
    static initialize(serviceBaseURL: string): void;
    /**
     * Checks if service's healthy
     *
     * @static
     * @returns {Promise<boolean>}
     * @memberof HTTPService
     */
    static ping(): Promise<boolean>;
}
export default HTTPService;
