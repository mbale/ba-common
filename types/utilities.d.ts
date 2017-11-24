import { Container } from 'typedi';
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
export declare function DIConnection(mongodbURL: string, entities: Function[], container: typeof Container): (object: object, propertyName: string, index?: number) => void;
export interface QueueDefinition {
}
export declare function DIRedisQueues(REDIS_URL: string, queues: QueueDefinition): Promise<void>;
