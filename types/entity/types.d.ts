import { ObjectID } from 'typeorm';
/**
 * We need the type only during compile time
 * We don't want to include the whole class all the time
 *
 * @export
 * @interface Service
 */
export interface Service {
    _id: ObjectID;
    name: string;
    _keywords: string[];
    _createdAt: Date;
    _updatedAt: Date;
}
export interface Match {
    _id: ObjectID;
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
export declare enum MatchOddsType {
    MoneyLine = 0,
    Spread = 1,
    Total = 2,
}
export declare enum MatchSourceType {
    Pinnacle = 0,
    Oddsgg = 1,
}
export interface MatchSource {
    type: MatchSourceType;
    leagueId: number;
    matchId: number;
    fetchedAt: Date;
}
export declare enum MatchMapType {
    Match = 0,
    Map1 = 1,
    Map2 = 2,
    Map3 = 3,
    Map4 = 4,
    Map5 = 5,
    Map6 = 6,
    Map7 = 7,
    Unknown = 8,
}
export declare enum MatchStatusType {
    Settled = 0,
    ReSettled = 1,
    Canceled = 2,
    ReSettleCancelled = 3,
    Deleted = 4,
    Unknown = 5,
}
export interface MatchUpdate {
    mapType: MatchMapType;
    statusType: MatchStatusType;
    endDate: Date;
    homeTeamScore: number;
    awayTeamScore: number;
    addedAt: Date;
}
export interface TeamMember {
    name: string;
    info?: string;
    joinedIn?: Date;
    countryCode?: string;
    sites?: string[];
    role?: string;
}
export declare enum TeamSocialSiteType {
    Facebook = 0,
    Twitter = 1,
}
export interface TeamSocialSite {
    type: TeamSocialSiteType;
    name: string;
}
export interface Team {
    info?: string;
    name: string;
    members?: TeamMember[];
    countryCode?: string;
    site: string;
    socialSites: TeamSocialSite[];
    logo?: string;
}
export interface League {
    name: string;
}
export interface Game {
    name: string;
    slug: string;
}
