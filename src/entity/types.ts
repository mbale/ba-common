import { ObjectID } from 'typeorm';
/**
 * We need the type only during compile time
 * We don't want to include the whole class all the time
 * 
 * @export
 * @interface Service
 */
export interface Service {
  _id : ObjectID;
  name : string;
  _keywords : string[];
  _createdAt : Date;
  _updatedAt : Date;
}

/*
  Match
*/

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
  MoneyLine,
  Spread,
  Total,
}

export enum MatchSourceType {
  Pinnacle,
  Oddsgg,
}

export interface MatchSource {
  type: MatchSourceType;
  leagueId: number;
  matchId: number;
  fetchedAt: Date;
}

export enum MatchMapType {
  Match,
  Map1,
  Map2,
  Map3,
  Map4,
  Map5,
  Map6,
  Map7,
  Unknown,
}

export enum MatchStatusType {
  Settled,
  ReSettled,
  Canceled,
  ReSettleCancelled,
  Deleted,
  Unknown,
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
  Team
*/

export interface TeamMember {
  name: string;
  info?: string;
  joinedIn?: Date;
  countryCode?: string;
  sites?: string[];
  role?: string;
}

export enum TeamSocialSiteType {
  Facebook, Twitter,
}

export interface TeamSocialSite {
  type : TeamSocialSiteType;
  name : string;
}

export interface Team {
  info? : string;
  name : string;
  members? : TeamMember[];
  countryCode? : string;
  site : string;
  socialSites : TeamSocialSite[];
  logo? : string;
}

/*
  League
*/

export interface League {
  name : string;
}


/*
  Game
*/

export interface Game {
  name : string;
  slug : string;
}
