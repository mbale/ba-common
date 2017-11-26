import { ObjectID } from 'typeorm';
/**
 * Compare type
 *
 * @enum {number}
 */
export declare enum CompareModes {
    Strict = 0,
    Similar = 1,
}
/**
 * Relation object between unit & entity
 *
 * @interface Relation
 */
export interface CompareRelation {
    /**
     * Entity Id which unit is related to
     *
     * @type {ObjectID}
     * @memberof RelatedEntity
     */
    entityId: ObjectID;
    /**
     * Relation type which shows how it relates in comparison
     * strict | similar
     *
     * @type {CompareModes}
     * @memberof RelatedEntity
     */
    relationType: CompareModes;
    /**
     * KeyType which shows what key is our base on comparison
     * only during strict
     *
     * @type {(CompareMatchType.MainIdentifier | CompareMatchType.KeywordIdentifier)}
     * @memberof RelatedEntity
     */
    keyType?: CompareMatchType.MainIdentifier | CompareMatchType.KeywordIdentifier;
    /**
     * Contains of the summed indexes of relativeness
     * only during similar
     *
     * @type {number}
     * @memberof RelatedEntity
     */
    summedIndex?: number;
}
/**
 * Type of mode result
 *
 * @enum {number}
 */
export declare enum CompareMatchType {
    MainIdentifier = 0,
    KeywordIdentifier = 1,
    NotFound = 2,
}
/**
 * Contains limit for calculation
 * dice: between to unit
 * levenshtein: numerical distance
 *
 * @export
 * @interface Thresholds
 */
export interface CompareThresholds {
    dice: number;
    levenshtein: number;
}
/**
 * Settings for comparing mode
 *
 * @export
 * @enum {number}
 */
export declare enum CompareMode {
    StrictOnly = 0,
    SimilarOnly = 1,
    StrictAndSimilar = 2,
}
/**
 * Compare options object for compare service
 *
 * @export
 * @interface CompareSettings
 */
export interface CompareSettings {
    mode: CompareMode;
    thresholds: CompareThresholds;
}
