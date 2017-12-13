import HTTPService from './http-service';
import { ObjectID } from 'typeorm';

/*
  DB types
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

export interface Game {
  _id: ObjectID;
  name : string;
  slug : string;
}

/*
  HTTP types
*/

export interface CompareQueryParams {
  'team-name'?: string;
  'game-name'?: string;
}

export interface CompareResponseBody {
  gameId : ObjectID;
  teamId : ObjectID;
}

export interface GetTeamsQueryParams {
  ids?: string[] | string;
}

export interface GetGamesQueryParams {
  ids?: string[] | string;
  slug?: string;
  name?: string;
}

class TeamHTTPService extends HTTPService {
  async getTeams(params: GetTeamsQueryParams): Promise<Team[]> {
    const { data }: { data: Team[] } = await this.axiosInstance.get('teams', {
      params,
    });

    return data;
  }

  async getGames(params: GetGamesQueryParams): Promise<Game[]> {
    const { data }: { data: Game[] } = await this.axiosInstance.get('games', {
      params,
    });

    return data;
  }

  async compare(params: CompareQueryParams): Promise<CompareResponseBody> {
    const { data }: { data: CompareResponseBody } = await this.axiosInstance.post('compare', {
      params,
    });
    return data;
  }
}

export default TeamHTTPService;
