import axios, { AxiosError, AxiosInstance } from 'axios';
import ExtendoError from 'extendo-error';
import { inject, injectable } from 'inversify';
import { LoggerInstance } from 'winston';

/**
 * If connection to microservice is not available
 *  
 * @export
 * @class MicroserviceError
 * @extends {ExtendoError}
 */
export class MicroserviceError extends ExtendoError {
  public serviceName: string = null;
  public serviceURL: string = null;

  /**
   * Creates an instance of MicroserviceError.
   * @param {string} serviceName 
   * @param {string} serviceURL 
   * @memberof MicroserviceError
   */
  constructor(serviceName: string, serviceURL: string) {
    super(`${serviceName} is not available at ${serviceURL}`);

    this.serviceName = serviceName;
    this.serviceURL = serviceURL;
  }
}

/**
 * Default base class for each service communicator
 * 
 * @abstract
 * @class HTTPService
 */
@injectable()
abstract class HTTPService {
  constructor(
    @inject('httpservice.name') protected serviceName: string,
    @inject('axios') protected axiosInstance: AxiosInstance,
    @inject('logger') protected logger: LoggerInstance,
  ) {
    this.serviceName = serviceName;
    this.logger = logger;
    this.axiosInstance = axiosInstance;
    // global error handler
    this.axiosInstance.interceptors.response.use(null, (error: AxiosError) => {
      if (error.response) { // semantics error
        this.logger.warn(error.message, error.stack);
      } else { // network or server error
        this.logger.error(error.message, error.stack);
      }
      throw error;
    });
  }

  /**
   * Checks if service's healthy
   * 
   * @static
   * @returns {Promise<boolean>} 
   * @memberof HTTPService
   */
  public async ping() : Promise<boolean> {
    await this.axiosInstance.get('/');
    return true;
  }
}

export default HTTPService;
