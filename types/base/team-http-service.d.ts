import HTTPService from './http-service';
import { ObjectID } from 'typeorm';
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
    _id: ObjectID;
    info?: string;
    name: string;
    members?: TeamMember[];
    countryCode?: string;
    site: string;
    socialSites: TeamSocialSite[];
    logo?: string;
}
export interface Game {
    _id: ObjectID;
    name: string;
    slug: string;
}
export interface CompareQueryParams {
    'team-name'?: string;
    'game-name'?: string;
}
export interface CompareResponseBody {
    gameId: ObjectID;
    teamId: ObjectID;
}
export interface GetTeamsQueryParams {
    ids?: string[] | string;
}
export interface GetGamesQueryParams {
    ids?: string[] | string;
    slug?: string;
    name?: string;
}
declare class TeamHTTPService extends HTTPService {
    getTeams(params: GetTeamsQueryParams): Promise<Team[]>;
    getGames(params: GetGamesQueryParams): Promise<Game[]>;
    compare(params: CompareQueryParams): Promise<CompareResponseBody>;
}
export default TeamHTTPService;
