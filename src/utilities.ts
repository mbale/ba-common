import { ConnectionOptions, createConnection } from 'typeorm';
import { Container } from 'typedi';
import * as Queue from 'bull';
import * as winston from 'winston';
import 'winston-mongodb'; // inject
import { WinstonMongoDBTransports } from 'winston-mongodb';

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
export function dILogger(mongodb_url: string): winston.LoggerInstance {
  // winston mongodb has typebug
  const transports = winston.transports as WinstonMongoDBTransports;
  const logger = new winston.Logger({
    transports: [
      new (winston.transports.Console)({ level: 'info' }),
      new transports.MongoDB({
        level: 'error',
        db: mongodb_url,
        collection: 'logs',
        storeHost: true, // origin of log (hostname)
        tryReconnect: true, // we make sure we always log
      }),
    ],
  });

  logger.log('info', `Logger is connected to ${mongodb_url}`);
  return logger;
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
export function dIRedisQueues(redis_url: string, queues: any, logger: winston.LoggerInstance): {} {
  try {
    for (const [varName, queueName] of Object.entries(queues)) {
      queues[varName] = new Queue(queueName, redis_url);
    }

    logger.info(`Redis's connected to ${redis_url}`);
    return queues;
  } catch (error) {
    logger.log('error', error);
    throw error;
  }
}
