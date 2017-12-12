import HTTPService from './http-service';
import { ObjectID } from 'typeorm';

/*
  DB types
*/

export interface League {
  name : string;
}

export interface Match {
  _id : ObjectID;
  gameId: ObjectID;
  leagueId: ObjectID;
  homeTeamId: ObjectID;
  awayTeamId: ObjectID;
  date: Date;
  odds: MatchOdds[];
  updates: MatchUpdate[];
}

export interface MatchOdds {
  home: number;
  away: number;
  type: MatchOddsType;
  _id: ObjectID;
}

export enum MatchOddsType {
  MoneyLine = 'moneyline',
  Spread = 'spread',
  Total = 'total',
}

export enum MatchSourceType {
  Pinnacle = 'pinnacle',
  Oddsgg = 'oddsgg',
}

export interface MatchSource {
  type: MatchSourceType;
  leagueId: number;
  matchId: number;
  fetchedAt: Date;
}

export enum MatchMapType {
  Match = 'match',
  Map1  = 'map1',
  Map2  = 'map2',
  Map3  = 'map3',
  Map4  = 'map4',
  Map5  = 'map5',
  Map6  = 'map6',
  Map7 = 'map7',
  Unknown = 'unknown',
}

export enum MatchStatusType {
  Settled = 'settled',
  ReSettled = 'resettled',
  Canceled = 'canceled',
  ReSettleCancelled = 'resettlecancelled',
  Deleted = 'deleted',
  Unknown = 'unknown',
  // not in db
  Upcoming = 'upcoming',
  Completed = 'completed',

}

export interface MatchUpdate {
  mapType: MatchMapType;
  statusType: MatchStatusType;
  endDate: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  addedAt: Date;
}

/*
  HTTP types
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

export interface GetLeaguesQueryParams {
  ids?: string[] | string;
}

class MatchHTTPService extends HTTPService {
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
  async getMatches(params: GetMatchesQueryParams) : Promise<Match[]> {
    const { data } = await this.axiosInstance.get('matches', {
      params,
    });

    return data;
  }

  /**
   * Get leagues
   * 
   * @static
   * @param {ObjectID[]} [ids] 
   * @returns {Promise<League[]>} 
   * @memberof MatchService
   */
  async getLeagues(params: GetLeaguesQueryParams) : Promise<League[]> {
    const { data } = await this.axiosInstance.get('leagues', {
      params,
    });

    return data;
  }
}

export default MatchHTTPService;
