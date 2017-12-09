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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
var CompareMatchType;
(function (CompareMatchType) {
    CompareMatchType[CompareMatchType["MainIdentifier"] = 0] = "MainIdentifier";
    CompareMatchType[CompareMatchType["KeywordIdentifier"] = 1] = "KeywordIdentifier";
    CompareMatchType[CompareMatchType["NotFound"] = 2] = "NotFound";
})(CompareMatchType = exports.CompareMatchType || (exports.CompareMatchType = {}));
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = __webpack_require__(5);
exports.Compare = compare_1.default;
const http_service_1 = __webpack_require__(7);
exports.HTTPService = http_service_1.default;
const entity_1 = __webpack_require__(9);
exports.ServiceEntity = entity_1.default;
const utilities_1 = __webpack_require__(10);
exports.AppError = utilities_1.AppError;
exports.dIConnection = utilities_1.dIConnection;
exports.dILogger = utilities_1.dILogger;
exports.dIRedisQueues = utilities_1.dIRedisQueues;
const types_1 = __webpack_require__(13);
exports.MatchMapType = types_1.MatchMapType;
exports.MatchOddsType = types_1.MatchOddsType;
exports.MatchSourceType = types_1.MatchSourceType;
exports.MatchStatusType = types_1.MatchStatusType;
exports.TeamSocialSiteType = types_1.TeamSocialSiteType;
const types_2 = __webpack_require__(0);
exports.CompareModes = types_2.CompareModes;
exports.CompareMode = types_2.CompareMode;
exports.CompareMatchType = types_2.CompareMatchType;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __webpack_require__(0);
const immutable_1 = __webpack_require__(1);
const dice_1 = __webpack_require__(6);
/**
 * Base abstract class that contains all core functionality for extending further compare services
 *
 * @abstract
 * @class Compare
 */
class Compare {
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
        const { StrictOnly, SimilarOnly, StrictAndSimilar, } = types_1.CompareMode;
        const modelCountBefore = this.relatedEntities.count();
        if (mode === StrictOnly || mode === StrictAndSimilar) {
            const result = this.strictCompare(entity);
            switch (result) {
                case types_1.CompareMatchType.MainIdentifier:
                    this.relatedEntities = this.relatedEntities.push({
                        entityId: entity._id,
                        relationType: types_1.CompareModes.Strict,
                        keyType: types_1.CompareMatchType.MainIdentifier,
                    });
                    break;
                case types_1.CompareMatchType.KeywordIdentifier:
                    this.relatedEntities = this.relatedEntities.push({
                        entityId: entity._id,
                        relationType: types_1.CompareModes.Strict,
                        keyType: types_1.CompareMatchType.KeywordIdentifier,
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
                    relationType: types_1.CompareModes.Similar,
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
     * @param {Service} entity
     * @returns {CompareMatchType}
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
            return types_1.CompareMatchType.MainIdentifier;
        }
        if (keywordIdentifierMatch) {
            return types_1.CompareMatchType.KeywordIdentifier;
        }
        return types_1.CompareMatchType.NotFound;
    }
    /**
     * Compare unit with entity in similar indexed way
     *
     * @protected
     * @param {Service} entity
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
     * @returns {List<CompareRelation>}
     * @memberof BaseCompare
     */
    getRelatedByRank() {
        return this.relatedEntities
            .sort((a, b) => b.summedIndex - a.summedIndex)
            .toArray();
    }
}
exports.default = Compare;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("talisman/metrics/distance/dice");

/***/ }),
/* 7 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(8);
/**
 * Default base class for each service communicator
 *
 * @abstract
 * @class HTTPService
 */
let HTTPService = class HTTPService {
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
        this.axiosInstance = axiosInstance;
    }
    /**
     * Checks if service's healthy
     *
     * @static
     * @returns {Promise<boolean>}
     * @memberof HTTPService
     */
    async ping() {
        try {
            const request = await this.axiosInstance.get('/');
        }
        catch (e) {
            return false;
        }
        return true;
    }
};
HTTPService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject('axios')),
    __metadata("design:paramtypes", [Object])
], HTTPService);
exports.default = HTTPService;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),
/* 9 */
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
const typeorm_1 = __webpack_require__(2);
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
exports.default = ServiceEntity;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Queue = __webpack_require__(11);
const typeorm_1 = __webpack_require__(2);
const immutable_1 = __webpack_require__(1);
__webpack_require__(12);
// https://github.com/winstonjs/winston-mongodb/issues/97
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
 * @param {typeof Container} container
 * @returns
 */
function dIConnection(mongodbURL, entities, container) {
    if (!mongodbURL) {
        throw new Error('Missing mongodb URL');
    }
    return function (object, propertyName, index) {
        try {
            const dbOptions = {
                entities,
                type: 'mongodb',
                url: mongodbURL,
                logging: ['query', 'error'],
            };
            const connection = typeorm_1.createConnection(dbOptions);
            container.registerHandler({ object, propertyName, index, value: () => connection });
        }
        catch (error) {
            throw error;
        }
    };
}
exports.dIConnection = dIConnection;
/**
 * Injectable Logger interface
 *
 * @export
 * @param {string} mongodb_url
 * @returns {winston.LoggerInstance}
 */
function dILogger(mongodbURL, winston, container) {
    if (!mongodbURL || !winston || !container) {
        throw new Error('Missing dependencies');
    }
    return function (object, propertyName, index) {
        try {
            // winston mongodb has typebug
            const transports = winston.transports;
            const logger = new winston.Logger({
                transports: [
                    new (winston.transports.Console)({ level: 'info' }),
                    new winston.transports.MongoDB({
                        level: 'error',
                        db: mongodbURL,
                        collection: 'logs',
                        storeHost: true,
                        tryReconnect: true,
                    }),
                ],
            });
            container.registerHandler({ object, propertyName, index, value: () => logger });
        }
        catch (error) {
            throw error;
        }
    };
}
exports.dILogger = dILogger;
/**
 * Injectable Redis interface
 *
 * @export
 * @param {string} redis_url
 * @param {*} queues
 * @param {winston.LoggerInstance} logger
 * @returns {{}}
 */
function dIRedisQueues(redisURL, queues, container) {
    if (!redisURL) {
        throw new Error('Missing dependencies');
    }
    return function (object, propertyName, index) {
        try {
            let store = immutable_1.Map();
            for (const [varName, queueName] of Object.entries(queues)) {
                store = store.set(queueName, new Queue(queueName, redisURL));
            }
            container.registerHandler({ object, propertyName, index, value: () => store });
        }
        catch (error) {
            throw error;
        }
    };
}
exports.dIRedisQueues = dIRedisQueues;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("bull");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("winston-mongodb");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MatchOddsType;
(function (MatchOddsType) {
    MatchOddsType["MoneyLine"] = "moneyline";
    MatchOddsType["Spread"] = "spread";
    MatchOddsType["Total"] = "total";
})(MatchOddsType = exports.MatchOddsType || (exports.MatchOddsType = {}));
var MatchSourceType;
(function (MatchSourceType) {
    MatchSourceType["Pinnacle"] = "pinnacle";
    MatchSourceType["Oddsgg"] = "oddsgg";
})(MatchSourceType = exports.MatchSourceType || (exports.MatchSourceType = {}));
var MatchMapType;
(function (MatchMapType) {
    MatchMapType["Match"] = "match";
    MatchMapType["Map1"] = "map1";
    MatchMapType["Map2"] = "map2";
    MatchMapType["Map3"] = "map3";
    MatchMapType["Map4"] = "map4";
    MatchMapType["Map5"] = "map5";
    MatchMapType["Map6"] = "map6";
    MatchMapType["Map7"] = "map7";
    MatchMapType["Unknown"] = "unknown";
})(MatchMapType = exports.MatchMapType || (exports.MatchMapType = {}));
var MatchStatusType;
(function (MatchStatusType) {
    MatchStatusType["Settled"] = "settled";
    MatchStatusType["ReSettled"] = "resettled";
    MatchStatusType["Canceled"] = "canceled";
    MatchStatusType["ReSettleCancelled"] = "resettlecancelled";
    MatchStatusType["Deleted"] = "deleted";
    MatchStatusType["Unknown"] = "unknown";
    // not in db
    MatchStatusType["Upcoming"] = "upcoming";
    MatchStatusType["Completed"] = "completed";
})(MatchStatusType = exports.MatchStatusType || (exports.MatchStatusType = {}));
var TeamSocialSiteType;
(function (TeamSocialSiteType) {
    TeamSocialSiteType[TeamSocialSiteType["Facebook"] = 0] = "Facebook";
    TeamSocialSiteType[TeamSocialSiteType["Twitter"] = 1] = "Twitter";
})(TeamSocialSiteType = exports.TeamSocialSiteType || (exports.TeamSocialSiteType = {}));


/***/ })
/******/ ]);
//# sourceMappingURL=main.map