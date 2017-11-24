import { ConnectionOptions, createConnection } from 'typeorm';
import { Container } from 'typedi';

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
export function DIConnection(mongodbURL : string, entities : Function[], container : typeof Container) {
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
      console.log(error)
    }
  };
}

export interface QueueDefinition {

}

export async function DIRedisQueues(REDIS_URL : string, queues : QueueDefinition) {

}

