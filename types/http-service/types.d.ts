import { MatchStatusType } from '../entity/types';
import { ObjectID } from 'typeorm';
/**
 * Queryparam interface for get matches
 *
 * @interface GetMatchesQueryParams
 */
export interface GetMatchesQueryParams {
    ids: ObjectID[] | ObjectID;
    limit: string;
    page: string;
    skip: string;
    statusType: MatchStatusType;
}
