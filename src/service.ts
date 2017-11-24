import axios, { AxiosInstance} from 'axios';
import qs from 'qs';

/**
 * Default base class for each service communicator
 * 
 * @abstract
 * @class BaseService
 */
export abstract class BaseService {
  /**
   * Contains root URL of service
   * 
   * @static
   * @memberof BaseService
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
   * @memberof BaseService
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
   * @memberof BaseService
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
