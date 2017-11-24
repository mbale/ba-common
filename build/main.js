require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const compare = __webpack_require__(3);
exports.compare = compare;
const entity = __webpack_require__(6);
exports.entity = entity;
const utility = __webpack_require__(7);
exports.utility = utility;
const task = __webpack_require__(9);
exports.task = task;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __webpack_require__(4);
const dice_1 = __webpack_require__(5);
/**
 * Compare type
 *
 * @enum {number}
 */
var CompareModes;
(function (CompareModes) {
    CompareModes[CompareModes["Strict"] = 0] = "Strict";
    CompareModes[CompareModes["Similar"] = 1] = "Similar";
})(CompareModes = exports.CompareModes || (exports.CompareModes = {}));
/**
 * Type of mode result
 *
 * @enum {number}
 */
var MatchType;
(function (MatchType) {
    MatchType[MatchType["MainIdentifier"] = 0] = "MainIdentifier";
    MatchType[MatchType["KeywordIdentifier"] = 1] = "KeywordIdentifier";
    MatchType[MatchType["NotFound"] = 2] = "NotFound";
})(MatchType = exports.MatchType || (exports.MatchType = {}));
/**
 * Settings for comparing mode
 *
 * @export
 * @enum {number}
 */
var CompareMode;
(function (CompareMode) {
    CompareMode[CompareMode["StrictOnly"] = 0] = "StrictOnly";
    CompareMode[CompareMode["SimilarOnly"] = 1] = "SimilarOnly";
    CompareMode[CompareMode["StrictAndSimilar"] = 2] = "StrictAndSimilar";
})(CompareMode = exports.CompareMode || (exports.CompareMode = {}));
/**
 * Base abstract class that contains all core functionality for extending further compare services
 *
 * @abstract
 * @class BaseCompare
 */
class BaseCompare {
    /**
     * Creates an instance of BaseCompare.
     *
     * @param {List<ServiceEntity>} collection
     * @memberof BaseCompare
     */
    constructor(compareSettings) {
        this.relatedEntities = immutable_1.List();
        /**
         * The string which we compare
         *
         * @protected
         * @type {string}
         * @memberof BaseCompare
         */
        this.unit = null;
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
    runInSequence(unit, entity) {
        if (!unit) {
            throw new Error('Missing unit to test');
        }
        if (!entity) {
            throw new Error('Missing entity to compare');
        }
        this.unit = unit.toLowerCase();
        const { mode, thresholds, } = this.compareSettings;
        const { StrictOnly, SimilarOnly, StrictAndSimilar, } = CompareMode;
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
    calculateIndex(unit1, unit2) {
        return dice_1.similarity(unit1, unit2);
    }
    /**
     * Compare unit with entity in strict way
     *
     * @protected
     * @param {ServiceEntity} entity
     * @returns {MatchType}
     * @memberof BaseCompare
     */
    strictCompare(entity) {
        const unit = this.unit;
        const entityName = entity.name.toLowerCase();
        const keywords = immutable_1.List(entity._keywords);
        // we first check if we've the same by name
        const MainIdentifierMatch = entityName === unit;
        // then we also check keywords
        const keywordIdentifierMatch = keywords
            .map(k => k.toLowerCase())
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
     * @param {ServiceEntity} entity
     * @returns {number}
     * @memberof BaseCompare
     */
    similarCompare(entity) {
        const unit = this.unit;
        const entityName = entity.name.toLowerCase();
        const diceThreshold = this.compareSettings.thresholds.dice;
        const keywords = immutable_1.List(entity._keywords);
        const mainIdentifierSimilarity = this
            .calculateIndex(entityName, unit);
        const keywordsIndexed = keywords
            .map((keyword) => {
            return {
                keyword: keyword.toLowerCase(),
                index: this.calculateIndex(keyword, unit),
            };
        })
            .filter(keywordIndexed => keywordIndexed.index >= diceThreshold)
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
    getRelatedByRank() {
        return this.relatedEntities
            .sort((a, b) => b.summedIndex - a.summedIndex)
            .toArray();
    }
}
exports.BaseCompare = BaseCompare;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("talisman/metrics/distance/dice");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(0);
var SourceType;
(function (SourceType) {
    SourceType["Pinnacle"] = "pinnacle";
    SourceType["OddsGG"] = "oddsgg";
})(SourceType = exports.SourceType || (exports.SourceType = {}));
class ServiceEntity {
    constructor() {
        this._keywords = [];
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }
    updateModificationDate() {
        this._updatedAt = new Date();
    }
}
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], ServiceEntity.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ServiceEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], ServiceEntity.prototype, "_sources", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], ServiceEntity.prototype, "_keywords", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ServiceEntity.prototype, "_createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ServiceEntity.prototype, "_updatedAt", void 0);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServiceEntity.prototype, "updateModificationDate", null);
exports.ServiceEntity = ServiceEntity;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(0);
const typedi_1 = __webpack_require__(8);
/**
 * BaseError
 *
 * @export
 * @class AppError
 * @extends {Error}
 */
class AppError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        // just in case we save name of constructor too
        this.name = this.constructor.name;
    }
}
exports.AppError = AppError;
/**
 * Used to inject db dependency
 *
 * @export
 * @param {string} mongodbURL
 * @param {Function[]} entities
 * @returns
 */
function connection(mongodbURL, entities) {
    return function (object, propertyName, index) {
        const dbOptions = {
            entities,
            type: 'mongodb',
            url: mongodbURL,
            logging: ['query', 'error'],
        };
        const connection = typeorm_1.createConnection(dbOptions);
        typedi_1.Container.registerHandler({ object, propertyName, index, value: () => connection });
    };
}
exports.connection = connection;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("typedi");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BaseTask {
    constructor(repository) {
        this.repository = null;
        this.repository = repository;
    }
}
exports.BaseTask = BaseTask;


/***/ })
/******/ ]);
//# sourceMappingURL=main.map