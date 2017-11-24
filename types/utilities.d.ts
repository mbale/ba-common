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
 * @returns
 */
export declare function connection(mongodbURL: string, entities: Function[]): (object: object, propertyName: string, index?: number) => void;
