import * as Queue from 'bull';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Container } from 'typedi';
import { Map } from 'immutable';
import { Queue as IQueue } from 'bull';
// https://github.com/OptimalBits/bull/issues/786
import { Winston } from 'winston';
import {
  WinstonMongoDBTransports,
} from 'winston-mongodb'; // inject

/**
 * BaseError
 * 
 * @export
 * @class AppError
 * @extends {Error}
 */
export class AppError extends Error {
  constructor(message : string) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    
    // just in case we save name of constructor too
    this.name = this.constructor.name;
  }
}

/**
 * Used to inject db dependency
 * 
 * @export
 * @param {string} mongodbURL 
 * @param {Function[]} entities 
 * @param {typeof Container} container 
 * @returns 
 */
export function dIConnection(
  mongodbURL : string, entities : Function[], container : typeof Container) {
  if (!mongodbURL) {
    throw new Error('Missing mongodb URL');
  }
  return function (object : object, propertyName : string, index? : number) {
    try {
      const dbOptions : ConnectionOptions = {
        entities,
        type: 'mongodb',
        url: mongodbURL,
        logging: ['query', 'error'],
      };

      const connection = createConnection(dbOptions);
      container.registerHandler({ object, propertyName, index, value: () => connection }); 
    } catch (error) {
      throw error;
    }
  };
}

/**
 * Injectable Logger interface
 * 
 * @export
 * @param {string} mongodb_url 
 * @returns {winston.LoggerInstance} 
 */
export function dILogger(mongodbURL : string, winston: Winston, container : typeof Container) {
  if (!mongodbURL || !winston || !container) {
    throw new Error('Missing dependencies');
  }
  return function (object : object, propertyName : string, index? : number) {
    try {
      // winston mongodb has typebug
      const transports = winston.transports as WinstonMongoDBTransports;
      const logger = new winston.Logger({
        transports: [
          new (winston.transports.Console)({ level: 'info' }),
          new transports.MongoDB({
            level: 'error',
            db: mongodbURL,
            collection: 'logs',
            storeHost: true, // origin of log (hostname)
            tryReconnect: true, // we make sure we always log
          }),
        ],
      });

      container.registerHandler({ object, propertyName, index, value: () => logger }); 
    } catch (error) {
      throw error;
    }
  };
}

/**
 * Injectable Redis interface
 * 
 * @export
 * @param {string} redis_url 
 * @param {*} queues 
 * @param {winston.LoggerInstance} logger 
 * @returns {{}} 
 */

export function dIRedisQueues(redisURL: string, queues: any, container: typeof Container) {
  if (!redisURL) {
    throw new Error('Missing dependencies');
  }
  return function (object : object, propertyName : string, index? : number) {
    try {
      let store = Map<string, IQueue>();
      
      for (const [varName, queueName] of Object.entries(queues)) {
        store = store.set(queueName, new Queue(queueName, redisURL));
      }

      container.registerHandler({ object, propertyName, index, value: () => store }); 
    } catch (error) {
      throw error;
    }
  };
}
