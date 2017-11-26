import { CompareMatchType, CompareRelation, CompareSettings } from './types';
import { List } from 'immutable';
import { Service } from '../entity/types';
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
