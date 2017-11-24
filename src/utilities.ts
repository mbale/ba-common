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
 * @returns 
 */
export function DIConnection(mongodbURL : string, entities : Function[]) {
  return function (object : object, propertyName : string, index? : number) {
    const dbOptions : ConnectionOptions = {
      entities,
      type: 'mongodb',
      url: mongodbURL,
      logging: ['query', 'error'],
    };
    const connection = createConnection(dbOptions);
    Container.registerHandler({ object, propertyName, index, value: () => connection });
  };
}
