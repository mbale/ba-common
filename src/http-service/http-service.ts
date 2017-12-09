import axios, { AxiosInstance } from 'axios';
import { inject, injectable } from 'inversify';
import { LoggerInstance } from 'winston';

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
    @inject('logger') protected logger: LoggerInstance,
  ) {
    this.axiosInstance = axiosInstance;
    this.logger = logger;
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
