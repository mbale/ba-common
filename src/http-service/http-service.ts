import axios, { AxiosInstance} from 'axios';
import * as qs from 'qs';

/**
 * Default base class for each service communicator
 * 
 * @abstract
 * @class HTTPService
 */
abstract class HTTPService {
  /**
   * Contains root URL of service
   * 
   * @static
   * @memberof HTTPService
   */
  public static serviceBaseURL : string = '';
  public static axiosInstance : AxiosInstance = null;

  /**
   * Initialize the core service with bootstrapped values
   * Needs to be called
   * 
   * @static
   * @param {string} serviceBaseURL 
   * @returns 
   * @memberof HTTPService
   */
  public static initialize(serviceBaseURL : string) {
    this.serviceBaseURL = serviceBaseURL;
    this.axiosInstance = axios.create({
      paramsSerializer(param) {
        // by default axios convert same query params into array in URL e.g. ids=[] 
        return qs.stringify(param, { indices: false });
      },
      baseURL: `${serviceBaseURL}`,
    });
  }

  /**
   * Checks if service's healthy
   * 
   * @static
   * @returns {Promise<boolean>} 
   * @memberof HTTPService
   */
  public static async ping() : Promise<boolean> {
    try {
      const request = await this.axiosInstance.get(`${this.serviceBaseURL}/ping`);
    } catch (e) {
      return false;
    }
    return true;
  }
}

export default HTTPService;
