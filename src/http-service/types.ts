import { MatchStatusType } from '../entity/types';
import { ObjectID } from 'typeorm';

/*
  Matches
*/

/**
 * Queryparam interface for get matches
 * 
 * @interface GetMatchesQueryParams
 */
export interface GetMatchesQueryParams {
  ids?: string[] | string;
  limit?: string;
  page?: string;
  skip?: string;
  statusType?: MatchStatusType;
}
