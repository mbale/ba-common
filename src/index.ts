import HTTPController, { LoggingMiddleware } from './base/http-controller';
import HTTPService, { MicroserviceError } from './base/http-service';
import ServiceEntity, { Service } from './base/service-entity';
import TaskService, { IdentifierHandler, IdentifierTypes } from './base/task-service';
import rabbitMQConfig from './base/rabbitmq-config';
import TeamHTTPService, {
  CompareQueryParams,
  CompareResponseBody,
  Game,
  GetGamesQueryParams,
  GetTeamsQueryParams,
  Team,
  TeamMember,
  TeamSocialSite,
  TeamSocialSiteType,
} from './base/team-http-service';
import MatchHTTPService, {
  GetLeaguesQueryParams,
  GetMatchesQueryParams,
  League,
  Match,
  MatchMapType,
  MatchOdds,
  MatchOddsType,
  MatchSource,
  MatchSourceType,
  MatchUpdate,
  MatchStatusType,
  MatchOddsSource,
} from './base/match-http-service';
import Compare, {
  CompareMatchType,
  CompareMode,
  CompareModes,
  CompareRelation,
  CompareSettings,
  CompareThresholds,
} from './base/compare';

export {
  // httpcontroller
  HTTPController,
  LoggingMiddleware,
  // httpservice
  HTTPService,
  MicroserviceError,
  // service entity
  ServiceEntity,
  Service,
  // teamhttp service
  TeamHTTPService,
  CompareQueryParams,
  CompareResponseBody,
  Game,
  GetGamesQueryParams,
  GetTeamsQueryParams,
  Team,
  TeamMember,
  TeamSocialSite,
  TeamSocialSiteType,
  // matchhttp service
  MatchHTTPService,
  GetLeaguesQueryParams,
  GetMatchesQueryParams,
  League,
  Match,
  MatchMapType,
  MatchOddsSource,
  MatchOdds,
  MatchOddsType,
  MatchSource,
  MatchSourceType,
  MatchUpdate,
  MatchStatusType,
  // compare
  Compare,
  CompareMatchType,
  CompareMode,
  CompareModes,
  CompareRelation,
  CompareSettings,
  CompareThresholds,
  // task service
  TaskService,
  IdentifierHandler,
  // external / internal communication
  rabbitMQConfig,
  IdentifierTypes
};
