"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCustomEntityChildren = exports.saveCustomEntity = exports.loadCustomEntity = exports.loadCustomEntities = exports.loadCustomEntitesAutocomplete = exports.LOAD_CUSTOM_ENTITY_CHILDREN = exports.LOAD_CUSTOM_ENTITY_CHILDREN_STARTED = exports.LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE = exports.LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE_STARTED = exports.CUSTOM_ENTITY_SAVE = exports.CUSTOM_ENTITY_SAVE_STARTED = exports.LOAD_CUSTOM_ENTITY_DETAILS = exports.LOAD_CUSTOM_ENTITY_DETAILS_STARTED = exports.LOAD_CUSTOM_ENTITIES_LIST = exports.LOAD_CUSTOM_ENTITIES_LIST_STARTED = void 0;

var _lo = require("app/utils/lo/lo");

var _actionUtils = require("app/utils/redux/action-utils");

var _customEntitiesQuery = _interopRequireDefault(require("graphql/entities/customEntities/customEntitiesQuery"));

var _customEntityDetailQueryBuilder = _interopRequireDefault(require("graphql/entities/customEntities/customEntityDetailQueryBuilder"));

var _saveCustomEntityMutation = _interopRequireDefault(require("graphql/entities/customEntities/saveCustomEntityMutation"));

var _customEntityAutocompleteQuery = _interopRequireDefault(require("graphql/entities/customEntities/customEntityAutocompleteQuery"));

var _customEntitiesChildrenQuery = _interopRequireDefault(require("graphql/entities/customEntities/customEntitiesChildrenQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
const LOAD_CUSTOM_ENTITIES_LIST_STARTED = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITIES_LIST_STARTED';
exports.LOAD_CUSTOM_ENTITIES_LIST_STARTED = LOAD_CUSTOM_ENTITIES_LIST_STARTED;
const LOAD_CUSTOM_ENTITIES_LIST = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITIES_LIST';
exports.LOAD_CUSTOM_ENTITIES_LIST = LOAD_CUSTOM_ENTITIES_LIST;
const LOAD_CUSTOM_ENTITY_DETAILS_STARTED = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITY_DETAILS_STARTED';
exports.LOAD_CUSTOM_ENTITY_DETAILS_STARTED = LOAD_CUSTOM_ENTITY_DETAILS_STARTED;
const LOAD_CUSTOM_ENTITY_DETAILS = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITY_DETAILS';
exports.LOAD_CUSTOM_ENTITY_DETAILS = LOAD_CUSTOM_ENTITY_DETAILS;
const CUSTOM_ENTITY_SAVE_STARTED = '@@affectli/entities/customEntities/CUSTOM_ENTITY_SAVE_STARTED';
exports.CUSTOM_ENTITY_SAVE_STARTED = CUSTOM_ENTITY_SAVE_STARTED;
const CUSTOM_ENTITY_SAVE = '@@affectli/entities/customEntities/CUSTOM_ENTITY_SAVE';
exports.CUSTOM_ENTITY_SAVE = CUSTOM_ENTITY_SAVE;
const LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE_STARTED = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE_STARTED';
exports.LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE_STARTED = LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE_STARTED;
const LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE';
exports.LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE = LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE;
const LOAD_CUSTOM_ENTITY_CHILDREN_STARTED = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITY_CHILDREN_STARTED';
exports.LOAD_CUSTOM_ENTITY_CHILDREN_STARTED = LOAD_CUSTOM_ENTITY_CHILDREN_STARTED;
const LOAD_CUSTOM_ENTITY_CHILDREN = '@@affectli/entities/customEntities/LOAD_CUSTOM_ENTITY_CHILDREN';
exports.LOAD_CUSTOM_ENTITY_CHILDREN = LOAD_CUSTOM_ENTITY_CHILDREN;
const loadCustomEntitesAutocomplete = (0, _actionUtils.loadData)(LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE_STARTED, LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE, _customEntityAutocompleteQuery.default);
exports.loadCustomEntitesAutocomplete = loadCustomEntitesAutocomplete;
const loadCustomEntities = (0, _actionUtils.loadTableData)(LOAD_CUSTOM_ENTITIES_LIST_STARTED, LOAD_CUSTOM_ENTITIES_LIST, _customEntitiesQuery.default);
exports.loadCustomEntities = loadCustomEntities;

const loadCustomEntity = id => (0, _actionUtils.loadData)(LOAD_CUSTOM_ENTITY_DETAILS_STARTED, LOAD_CUSTOM_ENTITY_DETAILS, (0, _customEntityDetailQueryBuilder.default)(Number(id)))({
  id
});

exports.loadCustomEntity = loadCustomEntity;

const saveCustomEntity = record => (0, _actionUtils.mutateData)(CUSTOM_ENTITY_SAVE_STARTED, CUSTOM_ENTITY_SAVE, _saveCustomEntityMutation.default, !(0, _lo.get)(record, 'id', false) ? 'Entity added.' : 'Entity updated.')({
  record
});

exports.saveCustomEntity = saveCustomEntity;

const loadCustomEntityChildren = id => (0, _actionUtils.loadData)(LOAD_CUSTOM_ENTITY_CHILDREN_STARTED, LOAD_CUSTOM_ENTITY_CHILDREN, _customEntitiesChildrenQuery.default)({
  id,
  filterBy: [{
    field: 'parent.id',
    op: '=',
    value: id
  }]
});

exports.loadCustomEntityChildren = loadCustomEntityChildren;