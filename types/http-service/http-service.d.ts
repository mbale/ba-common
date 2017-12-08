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
    protected baseURL: string;
    protected axiosInstance: AxiosInstance;
    /**
     * Initialize the core service with bootstrapped values
     * Needs to be called
     *
     * @static
     * @param {string} serviceBaseURL
     * @returns
     * @memberof HTTPService
     */
    initialize(serviceBaseURL: string): void;
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
