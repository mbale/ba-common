import { AxiosInstance } from 'axios';
/**
 * Default base class for each service communicator
 *
 * @abstract
 * @class HTTPService
 */
declare abstract class HTTPService {
    protected axiosInstance: AxiosInstance;
    constructor(axiosInstance: AxiosInstance);
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
