import { List } from 'immutable';
import { ObjectID } from 'typeorm';
import { Service } from './service-entity';
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
/**
 * Base abstract class that contains all core functionality for extending further compare services
 *
 * @abstract
 * @class Compare
 */
declare abstract class Compare {
    protected relatedEntities: List<CompareRelation>;
    /**
     * The string which we compare
     *
     * @protected
     * @type {string}
     * @memberof BaseCompare
     */
    protected unit: string;
    /**
     * Default compare settings which contains mode and threshold
     *
     * @protected
     * @abstract
     * @type {CompareSettings}
     * @memberof BaseCompare
     */
    protected abstract compareSettings: CompareSettings;
    /**
     * Creates an instance of BaseCompare.
     *
     * @param {List<ServiceEntity>} collection
     * @memberof BaseCompare
     */
    constructor(compareSettings?: CompareSettings);
    /**
     * Compare unit with entity
     *
     * @param {string} unit
     * @param {ServiceEntity} entity
     * @memberof BaseCompare
     */
    runInSequence(unit: string, entity: Service): boolean;
    /**
     * Get similarity index between two unit
     *
     * @protected
     * @param {string} unit1
     * @param {string} unit2
     * @returns {number}
     * @memberof BaseCompare
     */
    protected calculateIndex(unit1: string, unit2: string): number;
    /**
     * Compare unit with entity in strict way
     *
     * @protected
     * @param {Service} entity
     * @returns {CompareMatchType}
     * @memberof BaseCompare
     */
    protected strictCompare(entity: Service): CompareMatchType;
    /**
     * Compare unit with entity in similar indexed way
     *
     * @protected
     * @param {Service} entity
     * @returns {number}
     * @memberof BaseCompare
     */
    protected similarCompare(entity: Service): number;
    /**
     * Returns the related objects
     *
     * @returns {List<CompareRelation>}
     * @memberof BaseCompare
     */
    getRelatedByRank(): CompareRelation[];
}
export default Compare;
