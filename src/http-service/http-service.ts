import axios, { AxiosInstance} from 'axios';
import * as qs from 'qs';
import { inject, injectable } from 'inversify';

/**
 * Default base class for each service communicator
 * 
 * @abstract
 * @class HTTPService
 */
@injectable()
abstract class HTTPService {
  constructor(
    @inject('axios') protected axiosInstance: AxiosInstance,
  ) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * Checks if service's healthy
   * 
   * @static
   * @returns {Promise<boolean>} 
   * @memberof HTTPService
   */
  public async ping() : Promise<boolean> {
    try {
      const request = await this.axiosInstance.get('/');
    } catch (e) {
      return false;
    }
    return true;
  }
}

export default HTTPService;
