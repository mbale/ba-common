import { MatchStatusType } from '../entity/types';
/**
 * Queryparam interface for get matches
 *
 * @interface GetMatchesQueryParams
 */
export interface GetMatchesQueryParams {
    ids?: string[] | string;
    limit?: string;
    page?: string;
    statusType?: MatchStatusType;
    gameId?: string;
    homeTeamId?: string;
    awayTeamId?: string;
    leagueId?: string;
}
/**
 * Queryparam interface for get games
 *
 * @interface GetGamesQueryParams
 */
export interface GetGamesQueryParams {
    ids?: string[] | string;
    slug?: string;
    name?: string;
}
