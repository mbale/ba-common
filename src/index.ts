import Compare from './compare/compare';
import HTTPService from './http-service/http-service';
import ServiceEntity from './entity/entity';
import { AppError, dIConnection, dILogger, dIRedisQueues } from './utilities';
import 'reflect-metadata';
import {
  Game,
  League,
  Match,
  MatchMapType,
  MatchOdds,
  MatchOddsType,
  MatchSource,
  MatchSourceType,
  MatchStatusType,
  MatchUpdate,
  Service,
  Team,
  TeamMember,
  TeamSocialSite,
  TeamSocialSiteType,
} from './entity/types';
import { 
  GetMatchesQueryParams,
  GetGamesQueryParams,
} from './http-service/types';
import { 
  CompareModes, 
  CompareMode, 
  CompareSettings,
  CompareMatchType, 
  CompareRelation, 
  CompareThresholds,
} from './compare/types';
import { Container } from 'typedi/Container';

export {
  Compare,
  CompareMode,
  CompareModes,
  CompareSettings, 
  CompareMatchType,
  CompareRelation,
  CompareThresholds,
  Service,
  ServiceEntity,
  MatchMapType,
  Match,
  MatchSource,
  MatchSourceType,
  MatchOdds,
  MatchOddsType,
  MatchStatusType,
  MatchUpdate,
  Team, 
  TeamMember, 
  TeamSocialSite, 
  TeamSocialSiteType,
  GetMatchesQueryParams,
  GetGamesQueryParams,
  League,
  Game,
  AppError,
  dIConnection,
  dILogger,
  dIRedisQueues,
  HTTPService,
};
