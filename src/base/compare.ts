import levenshtein from 'talisman/metrics/distance/levenshtein';
import { Collection, List, Map } from 'immutable';
import { EntitySchema, ObjectID } from 'typeorm';
import { Service } from './service-entity';
import {
  similarity,
} from 'talisman/metrics/distance/dice';

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
export interface CompareRelation {
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
   * @type {(CompareMatchType.MainIdentifier | CompareMatchType.KeywordIdentifier)}
   * @memberof RelatedEntity
   */
  keyType? : CompareMatchType.MainIdentifier | CompareMatchType.KeywordIdentifier;
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
export enum CompareMatchType {
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
  thresholds : CompareThresholds;
}

/**
 * Base abstract class that contains all core functionality for extending further compare services
 * 
 * @abstract
 * @class Compare
 */
abstract class Compare {
  protected relatedEntities: List<CompareRelation> = List();

  /**
   * The string which we compare
   * 
   * @protected
   * @type {string}
   * @memberof BaseCompare
   */
  protected unit : string = null;
  
  /**
   * Default compare settings which contains mode and threshold
   * 
   * @protected
   * @abstract
   * @type {CompareSettings}
   * @memberof BaseCompare
   */
  protected abstract compareSettings : CompareSettings;

  /**
   * Creates an instance of BaseCompare.
   * 
   * @param {List<ServiceEntity>} collection 
   * @memberof BaseCompare
   */
  constructor(compareSettings? : CompareSettings) {
    if (compareSettings) {
      this.compareSettings = compareSettings;
    }
  }

  /**
   * Compare unit with entity
   * 
   * @param {string} unit 
   * @param {ServiceEntity} entity  
   * @memberof BaseCompare
   */
  public runInSequence(unit : string, entity : Service) : boolean {
    if (!unit) {
      throw new Error('Missing unit to test');
    }

    if (!entity) {
      throw new Error('Missing entity to compare');
    }

    this.unit = unit.toLowerCase();

    const {
      mode,
      thresholds,
    } = this.compareSettings;

    const {
      StrictOnly,
      SimilarOnly,
      StrictAndSimilar,
    } = CompareMode;

    const modelCountBefore = this.relatedEntities.count();

    if (mode === StrictOnly || mode === StrictAndSimilar) {
      const result = this.strictCompare(entity);

      switch (result) {
        case CompareMatchType.MainIdentifier:
          this.relatedEntities = this.relatedEntities.push({
            entityId: entity._id,
            relationType: CompareModes.Strict,
            keyType: CompareMatchType.MainIdentifier,
          });
          break;
        case CompareMatchType.KeywordIdentifier:
          this.relatedEntities = this.relatedEntities.push({
            entityId: entity._id,
            relationType: CompareModes.Strict,
            keyType: CompareMatchType.KeywordIdentifier,
          });
        default:
          break;
      }
    }

    if (mode === SimilarOnly || mode === StrictAndSimilar) {
      const result = this.similarCompare(entity);
      if (result >= thresholds.dice) {
        this.relatedEntities = this.relatedEntities.push({
          entityId: entity._id,
          relationType: CompareModes.Similar,
          summedIndex: result,
        });
      }
    }

    const modelCountAfter = this.relatedEntities.count();

    return modelCountBefore === modelCountAfter ? false : true;
  }

  /**
   * Get similarity index between two unit
   * 
   * @protected
   * @param {string} unit1 
   * @param {string} unit2 
   * @returns {number} 
   * @memberof BaseCompare
   */
  protected calculateIndex(unit1 : string, unit2 : string) : number {
    return similarity(unit1, unit2);
  }

  /**
   * Compare unit with entity in strict way
   * 
   * @protected
   * @param {Service} entity 
   * @returns {CompareMatchType} 
   * @memberof BaseCompare
   */
  protected strictCompare(entity : Service) : CompareMatchType {
    const unit = this.unit;
    const entityName = entity.name.toLowerCase();
    const keywords = List(entity._keywords);
    // we first check if we've the same by name
    const MainIdentifierMatch = entityName === unit;
    // then we also check keywords
    const keywordIdentifierMatch = keywords
      // we make sure it's lowercase
      .map(k => k.toLowerCase())
      // strict find
      .contains(unit);

    if (MainIdentifierMatch) {
      return CompareMatchType.MainIdentifier;
    }

    if (keywordIdentifierMatch) {
      return CompareMatchType.KeywordIdentifier;
    }

    return CompareMatchType.NotFound;
  }

  /**
   * Compare unit with entity in similar indexed way
   * 
   * @protected
   * @param {Service} entity 
   * @returns {number} 
   * @memberof BaseCompare
   */
  protected similarCompare(entity : Service) : number {
    const unit = this.unit;
    const entityName = entity.name.toLowerCase();
    const diceThreshold = this.compareSettings.thresholds.dice;
    const keywords = List(entity._keywords);

    const mainIdentifierSimilarity = this
      .calculateIndex(entityName, unit);

    const keywordsIndexed = keywords
      // calculate their indexes
      .map((keyword) => {
        return {
          keyword: keyword.toLowerCase(), // make sure it's lowercase
          index: this.calculateIndex(keyword, unit),
        };
      })
      // remove invalids
      .filter(keywordIndexed => keywordIndexed.index >= diceThreshold)
      // sort them by rank
      .sort((a, b) => b.index - a.index);

    const mainIndex = mainIdentifierSimilarity >= diceThreshold ? mainIdentifierSimilarity : 0;
    const keywordsIndex = keywordsIndexed.reduce((sum, next) => sum + next.index, 0);

    /*
    We rank them by correlation
    */
    const summedIndex = mainIndex + keywordsIndex;

    return summedIndex;
  }

  /**
   * Returns the related objects
   * 
   * @returns {List<CompareRelation>} 
   * @memberof BaseCompare
   */
  public getRelatedByRank() {
    return this.relatedEntities
      .sort((a, b) => b.summedIndex - a.summedIndex)
      .toArray();
  }
}

export default Compare;
