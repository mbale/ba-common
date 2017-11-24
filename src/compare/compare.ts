import { MatchType, Relation, CompareSettings, CompareMode, CompareModes } from './types';
import { EntitySchema, ObjectID } from 'typeorm';
import { List, Map, Collection } from 'immutable';
import {
  similarity,
} from 'talisman/metrics/distance/dice';
import levenshtein from 'talisman/metrics/distance/levenshtein';
import { IServiceEntity } from '../entity/types';

/**
 * Base abstract class that contains all core functionality for extending further compare services
 * 
 * @abstract
 * @class Compare
 */
abstract class Compare {
  protected relatedEntities: List<Relation> = List();

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
  public runInSequence(unit : string, entity : IServiceEntity) : boolean {
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
        case MatchType.MainIdentifier:
          this.relatedEntities = this.relatedEntities.push({
            entityId: entity._id,
            relationType: CompareModes.Strict,
            keyType: MatchType.MainIdentifier,
          });
          break;
        case MatchType.KeywordIdentifier:
          this.relatedEntities = this.relatedEntities.push({
            entityId: entity._id,
            relationType: CompareModes.Strict,
            keyType: MatchType.KeywordIdentifier,
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
   * @param {IServiceEntity} entity 
   * @returns {MatchType} 
   * @memberof BaseCompare
   */
  protected strictCompare(entity : IServiceEntity) : MatchType {
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
      return MatchType.MainIdentifier;
    }

    if (keywordIdentifierMatch) {
      return MatchType.KeywordIdentifier;
    }

    return MatchType.NotFound;
  }

  /**
   * Compare unit with entity in similar indexed way
   * 
   * @protected
   * @param {IServiceEntity} entity 
   * @returns {number} 
   * @memberof BaseCompare
   */
  protected similarCompare(entity : IServiceEntity) : number {
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
   * @returns {List<Relation>} 
   * @memberof BaseCompare
   */
  public getRelatedByRank() {
    return this.relatedEntities
      .sort((a, b) => b.summedIndex - a.summedIndex)
      .toArray();
  }
}

export default Compare;