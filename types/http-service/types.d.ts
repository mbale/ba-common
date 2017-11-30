import { ObjectID } from 'typeorm';
/**
 * Queryparam interface for get matches
 *
 * @interface GetMatchesQueryParams
 */
export interface GetMatchesQueryParams {
    ids: ObjectID[];
    limit: number;
    page: number;
    skip: number;
    completed: boolean;
}
