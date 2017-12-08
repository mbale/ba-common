/// <reference types="winston" />
import { Container } from 'typedi';
import { Winston } from 'winston';
import 'winston-mongodb';
/**
 * BaseError
 *
 * @export
 * @class AppError
 * @extends {Error}
 */
export declare class AppError extends Error {
    constructor(message: string);
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
export declare function dIConnection(mongodbURL: string, entities: Function[], container: typeof Container): (object: object, propertyName: string, index?: number) => void;
/**
 * Injectable Logger interface
 *
 * @export
 * @param {string} mongodb_url
 * @returns {winston.LoggerInstance}
 */
export declare function dILogger(mongodbURL: string, winston: Winston, container: typeof Container): (object: object, propertyName: string, index?: number) => void;
/**
 * Injectable Redis interface
 *
 * @export
 * @param {string} redis_url
 * @param {*} queues
 * @param {winston.LoggerInstance} logger
 * @returns {{}}
 */
export declare function dIRedisQueues(redisURL: string, queues: any, container: typeof Container): (object: object, propertyName: string, index?: number) => void;
