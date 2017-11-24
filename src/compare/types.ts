import { ObjectID } from 'typeorm';
/**
 * Compare type
 * 
 * @enum {number}
 */
export enum CompareModes {
  Strict, Similar,
}

/**
 * Relation object between unit & entity
 * 
 * @interface Relation
 */
export interface Relation {
  /**
   * Entity Id which unit is related to
   * 
   * @type {ObjectID}
   * @memberof RelatedEntity
   */
  entityId : ObjectID;
  /**
   * Relation type which shows how it relates in comparison
   * strict | similar
   * 
   * @type {CompareModes}
   * @memberof RelatedEntity
   */
  relationType : CompareModes;
  /**
   * KeyType which shows what key is our base on comparison
   * only during strict
   * 
   * @type {(MatchType.MainIdentifier | MatchType.KeywordIdentifier)}
   * @memberof RelatedEntity
   */
  keyType? : MatchType.MainIdentifier | MatchType.KeywordIdentifier;
  /**
   * Contains of the summed indexes of relativeness
   * only during similar
   * 
   * @type {number}
   * @memberof RelatedEntity
   */
  summedIndex? : number;
}

/**
 * Type of mode result
 * 
 * @enum {number}
 */
export enum MatchType {
  MainIdentifier, KeywordIdentifier, NotFound,
}

/**
 * Contains limit for calculation
 * dice: between to unit
 * levenshtein: numerical distance
 * 
 * @export
 * @interface Thresholds
 */
export interface Thresholds {
  dice: number;
  levenshtein: number;
}

/**
 * Settings for comparing mode
 * 
 * @export
 * @enum {number}
 */
export enum CompareMode {
  StrictOnly, SimilarOnly, StrictAndSimilar,
}

/**
 * Compare options object for compare service
 * 
 * @export
 * @interface CompareSettings
 */
export interface CompareSettings {
  mode : CompareMode;
  thresholds : Thresholds;
}