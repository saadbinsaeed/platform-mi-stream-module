"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadChildren = exports.loadThing = exports.loadThingsList = exports.saveThing = exports.loadThingAutocomplete = exports.LOAD_THING_AUTOCOMPLETE = exports.LOAD_THING_AUTOCOMPLETE_STARTED = exports.LOAD_RECURSIVE_CLASSES = exports.LOAD_RECURSIVE_CLASSES_STARTED = exports.OPEN_THING = exports.OPEN_THING_STARTED = exports.LOAD_CHILDREN_FAILED = exports.LOAD_CHILDREN = exports.LOAD_CHILDREN_STARTED = exports.LOAD_THING = exports.LOAD_THING_STARTED = exports.LOAD_THINGS_GRID = exports.LOAD_THINGS_GRID_STARTED = exports.THING_SAVE = exports.THING_SAVE_STARTED = void 0;

var _lo = require("app/utils/lo/lo");

var _actionUtils = require("app/utils/redux/action-utils");

var _thingAutocompleteQuery = _interopRequireDefault(require("graphql/entities/things/thingAutocompleteQuery"));

var _thingChildrenQuery = _interopRequireDefault(require("graphql/entities/things/thingChildrenQuery"));

var _thingsQuery = _interopRequireDefault(require("graphql/entities/things/thingsQuery"));

var _thingQueryBuilder = _interopRequireDefault(require("graphql/entities/things/thingQueryBuilder"));

var _saveThingMutation = _interopRequireDefault(require("graphql/entities/things/saveThingMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const THING_SAVE_STARTED = '@@affectli/entities/things/THING_SAVE_STARTED';
exports.THING_SAVE_STARTED = THING_SAVE_STARTED;
const THING_SAVE = '@@affectli/entities/things/THING_SAVE';
exports.THING_SAVE = THING_SAVE;
const LOAD_THINGS_GRID_STARTED = '@@affectli/entities/things/LOAD_THINGS_GRID_STARTED';
exports.LOAD_THINGS_GRID_STARTED = LOAD_THINGS_GRID_STARTED;
const LOAD_THINGS_GRID = '@@affectli/entities/things/LOAD_THINGS_GRID';
exports.LOAD_THINGS_GRID = LOAD_THINGS_GRID;
const LOAD_THING_STARTED = '@@affectli/entities/things/LOAD_THING_STARTED';
exports.LOAD_THING_STARTED = LOAD_THING_STARTED;
const LOAD_THING = '@@affectli/entities/things/LOAD_THING';
exports.LOAD_THING = LOAD_THING;
const LOAD_CHILDREN_STARTED = '@@affectli/entities/things/LOAD_CHILDREN_STARTED';
exports.LOAD_CHILDREN_STARTED = LOAD_CHILDREN_STARTED;
const LOAD_CHILDREN = '@@affectli/entities/things/LOAD_CHILDREN';
exports.LOAD_CHILDREN = LOAD_CHILDREN;
const LOAD_CHILDREN_FAILED = '@@affectli/entities/things/LOAD_CHILDREN_FAILED';
exports.LOAD_CHILDREN_FAILED = LOAD_CHILDREN_FAILED;
const OPEN_THING_STARTED = '@@affectli/entities/things/OPEN_THING_STARTED';
exports.OPEN_THING_STARTED = OPEN_THING_STARTED;
const OPEN_THING = '@@affectli/entities/things/OPEN_THING';
exports.OPEN_THING = OPEN_THING;
const LOAD_RECURSIVE_CLASSES_STARTED = '@@affectli/entities/things/LOAD_RECURSIVE_CLASSES_STARTED';
exports.LOAD_RECURSIVE_CLASSES_STARTED = LOAD_RECURSIVE_CLASSES_STARTED;
const LOAD_RECURSIVE_CLASSES = '@@affectli/entities/things/LOAD_RECURSIVE_CLASSES';
exports.LOAD_RECURSIVE_CLASSES = LOAD_RECURSIVE_CLASSES;
const LOAD_THING_AUTOCOMPLETE_STARTED = '@@affectli/users/LOAD_THING_AUTOCOMPLETE_STARTED';
exports.LOAD_THING_AUTOCOMPLETE_STARTED = LOAD_THING_AUTOCOMPLETE_STARTED;
const LOAD_THING_AUTOCOMPLETE = '@@affectli/users/LOAD_THING_AUTOCOMPLETE';
/**
 * Loads the suggestions for the thing autocomplete component.
 */

exports.LOAD_THING_AUTOCOMPLETE = LOAD_THING_AUTOCOMPLETE;
const loadThingAutocomplete = (0, _actionUtils.loadData)(LOAD_THING_AUTOCOMPLETE_STARTED, LOAD_THING_AUTOCOMPLETE, _thingAutocompleteQuery.default);
exports.loadThingAutocomplete = loadThingAutocomplete;

const saveThing = record => (0, _actionUtils.mutateData)(THING_SAVE_STARTED, THING_SAVE, _saveThingMutation.default, !(0, _lo.get)(record, 'id', false) ? 'Thing added.' : 'Thing updated.')({
  record
});
/**
 * Load the Things List
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */


exports.saveThing = saveThing;
const loadThingsList = (0, _actionUtils.loadTableData)(LOAD_THINGS_GRID_STARTED, LOAD_THINGS_GRID, _thingsQuery.default);
/**
 * Load the detail of the specified Thing
 *
 * @param id the ID of the Thing to load
 */

exports.loadThingsList = loadThingsList;

const loadThing = id => (0, _actionUtils.loadData)(LOAD_THING_STARTED, LOAD_THING, (0, _thingQueryBuilder.default)(Number(id)))({
  id
});
/**
 * Load the children of the specified Thing.
 *
 * @param id parent id
 */


exports.loadThing = loadThing;

const loadChildren = id => (0, _actionUtils.loadData)(LOAD_CHILDREN_STARTED, LOAD_CHILDREN, _thingChildrenQuery.default)({
  id,
  filterBy: [{
    field: 'parent.id',
    op: '=',
    value: id
  }]
});

exports.loadChildren = loadChildren;