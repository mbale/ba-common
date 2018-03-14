import HTTPService from './http-service';
import { ObjectID } from 'typeorm';
export interface League {
    name: string;
}
export interface Match {
    _id: ObjectID;
    urlId: string;
    gameId: ObjectID;
    leagueId: ObjectID;
    homeTeamId: ObjectID;
    awayTeamId: ObjectID;
    date: Date;
    odds: MatchOdds[];
    updates: MatchUpdate[];
}
export declare enum MatchOddsSource {
    PINNACLE = "pinnacle",
}
export interface MatchOdds {
    home: number;
    away: number;
    type: MatchOddsType;
    _id: ObjectID;
    fetchedAt: Date;
    source: MatchOddsSource;
}
export declare enum MatchOddsType {
    MoneyLine = "moneyline",
    Spread = "spread",
    Total = "total",
}
export declare enum MatchSourceType {
    Pinnacle = "pinnacle",
    Oddsgg = "oddsgg",
}
export interface MatchSource {
    type: MatchSourceType;
    leagueId: number;
    matchId: number;
    fetchedAt: Date;
}
export declare enum MatchMapType {
    Match = "match",
    Map1 = "map1",
    Map2 = "map2",
    Map3 = "map3",
    Map4 = "map4",
    Map5 = "map5",
    Map6 = "map6",
    Map7 = "map7",
    Unknown = "unknown",
}
export declare enum MatchStatusType {
    Settled = "settled",
    ReSettled = "resettled",
    Canceled = "canceled",
    ReSettleCancelled = "resettlecancelled",
    Deleted = "deleted",
    Unknown = "unknown",
    Upcoming = "upcoming",
    Completed = "completed",
}
export interface MatchUpdate {
    mapType: MatchMapType;
    statusType: MatchStatusType;
    endDate: Date;
    homeTeamScore: number;
    awayTeamScore: number;
    addedAt: Date;
}
export interface GetMatchesQueryParams {
    ids?: string[] | string;
    limit?: string;
    page?: string;
    statusType?: MatchStatusType;
    gameIds?: string[];
    homeTeamId?: string;
    awayTeamId?: string;
    leagueId?: string;
}
export interface GetLeaguesQueryParams {
    ids?: string[] | string;
}
declare class MatchHTTPService extends HTTPService {
    /**
     * Get matches
     *
     * @static
     * @param {number} [limit]
     * @param {number} [page]
     * @param {ObjectID[]} [ids]
     * @returns {Promise<Match[]>}
     * @memberof MatchService
     */
    getMatches(params: GetMatchesQueryParams): Promise<Match[]>;
    /**
     * Get leagues
     *
     * @static
     * @param {ObjectID[]} [ids]
     * @returns {Promise<League[]>}
     * @memberof MatchService
     */
    getLeagues(params: GetLeaguesQueryParams): Promise<League[]>;
}
export default MatchHTTPService;
