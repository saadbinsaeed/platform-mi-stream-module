"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadClassificationAttributes = exports.loadRelationship = exports.loadRelationshipAddEntities = exports.createRelationship = exports.deleteRelationship = exports.fetchEntityRelationships = exports.updateRelationship = exports.loadRelationDefinitionAutocomplete = exports.loadEntityData = exports.LOAD_ENTITY_DATA = exports.LOAD_ENTITY_DATA_STARTED = exports.LOAD_RELATIONSHIP_CLASSIFICATIONS = exports.LOAD_RELATIONSHIP_CLASSIFICATIONS_STARTED = exports.LOAD_RELATIONSHIP_ENTITIES_ADD = exports.LOAD_RELATIONSHIP_ENTITIES_ADD_STARTED = exports.LOAD_RELATION_DEFINITION_AUTOCOMPLETE = exports.LOAD_RELATION_DEFINITION_AUTOCOMPLETE_STARTED = exports.GET_RELATIONSHIP = exports.GET_RELATIONSHIP_STARTED = exports.GET_RELATIONSHIPS = exports.GET_RELATIONSHIPS_STARTED = exports.REMOVE_RELATIONSHIP = exports.REMOVE_RELATIONSHIP_STARTED = exports.UPDATE_RELATIONSHIP = exports.UPDATE_RELATIONSHIP_STARTED = exports.ADD_RELATIONSHIP = exports.ADD_RELATIONSHIP_STARTED = void 0;

var _actionUtils = require("app/utils/redux/action-utils");

var _relationshipsQuery = _interopRequireDefault(require("graphql/entities/relationships/relationshipsQuery"));

var _createRelationMutation = _interopRequireDefault(require("graphql/entities/relationships/createRelationMutation"));

var _updateRelationMutation = _interopRequireDefault(require("graphql/entities/relationships/updateRelationMutation"));

var _deleteRelationMutation = _interopRequireDefault(require("graphql/entities/relationships/deleteRelationMutation"));

var _relationDefinitionAutocompleteQuery = _interopRequireDefault(require("graphql/entities/relationships/relationDefinitionAutocompleteQuery"));

var _addRelationshipsQuery = _interopRequireDefault(require("graphql/entities/relationships/addRelationshipsQuery"));

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _relationshipClassificationsQuery = _interopRequireDefault(require("graphql/entities/relationships/relationshipClassificationsQuery"));

var _singleRelationshipQuery = _interopRequireDefault(require("graphql/entities/relationships/singleRelationshipQuery"));

var _entityDataQueryBuilder = _interopRequireDefault(require("graphql/common/entityDataQueryBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ADD_RELATIONSHIP_STARTED = '@@affectli/relationships/ADD_RELATIONSHIP_STARTED';
exports.ADD_RELATIONSHIP_STARTED = ADD_RELATIONSHIP_STARTED;
const ADD_RELATIONSHIP = '@@affectli/relationships/ADD_RELATIONSHIP';
exports.ADD_RELATIONSHIP = ADD_RELATIONSHIP;
const UPDATE_RELATIONSHIP_STARTED = '@@affectli/relationships/UPDATE_RELATIONSHIP_STARTED';
exports.UPDATE_RELATIONSHIP_STARTED = UPDATE_RELATIONSHIP_STARTED;
const UPDATE_RELATIONSHIP = '@@affectli/relationships/UPDATE_RELATIONSHIP';
exports.UPDATE_RELATIONSHIP = UPDATE_RELATIONSHIP;
const REMOVE_RELATIONSHIP_STARTED = '@@affectli/relationships/REMOVE_RELATIONSHIP_STARTED';
exports.REMOVE_RELATIONSHIP_STARTED = REMOVE_RELATIONSHIP_STARTED;
const REMOVE_RELATIONSHIP = '@@affectli/relationships/REMOVE_RELATIONSHIP';
exports.REMOVE_RELATIONSHIP = REMOVE_RELATIONSHIP;
const GET_RELATIONSHIPS_STARTED = '@@affectli/relationships/GET_RELATIONSHIPS_STARTED';
exports.GET_RELATIONSHIPS_STARTED = GET_RELATIONSHIPS_STARTED;
const GET_RELATIONSHIPS = '@@affectli/relationships/GET_RELATIONSHIPS';
exports.GET_RELATIONSHIPS = GET_RELATIONSHIPS;
const GET_RELATIONSHIP_STARTED = '@@affectli/relationships/GET_RELATIONSHIP_STARTED';
exports.GET_RELATIONSHIP_STARTED = GET_RELATIONSHIP_STARTED;
const GET_RELATIONSHIP = '@@affectli/relationships/GET_RELATIONSHIP';
exports.GET_RELATIONSHIP = GET_RELATIONSHIP;
const LOAD_RELATION_DEFINITION_AUTOCOMPLETE_STARTED = '@@affectli/admin/groups/LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED';
exports.LOAD_RELATION_DEFINITION_AUTOCOMPLETE_STARTED = LOAD_RELATION_DEFINITION_AUTOCOMPLETE_STARTED;
const LOAD_RELATION_DEFINITION_AUTOCOMPLETE = '@@affectli/admin/groups/LOAD_CLASSIFICATION_AUTOCOMPLETE';
exports.LOAD_RELATION_DEFINITION_AUTOCOMPLETE = LOAD_RELATION_DEFINITION_AUTOCOMPLETE;
const LOAD_RELATIONSHIP_ENTITIES_ADD_STARTED = '@@affectli/entities/relationships/LOAD_RELATIONSHIP_ENTITIES_ADD_STARTED';
exports.LOAD_RELATIONSHIP_ENTITIES_ADD_STARTED = LOAD_RELATIONSHIP_ENTITIES_ADD_STARTED;
const LOAD_RELATIONSHIP_ENTITIES_ADD = '@@affectli/entities/relationships/LOAD_RELATIONSHIP_ENTITIES_ADD';
exports.LOAD_RELATIONSHIP_ENTITIES_ADD = LOAD_RELATIONSHIP_ENTITIES_ADD;
const LOAD_RELATIONSHIP_CLASSIFICATIONS_STARTED = '@@affectli/entities/relationships/LOAD_RELATIONSHIP_CLASSIFICATIONS_STARTED';
exports.LOAD_RELATIONSHIP_CLASSIFICATIONS_STARTED = LOAD_RELATIONSHIP_CLASSIFICATIONS_STARTED;
const LOAD_RELATIONSHIP_CLASSIFICATIONS = '@@affectli/entities/relationships/LOAD_RELATIONSHIP_CLASSIFICATIONS';
exports.LOAD_RELATIONSHIP_CLASSIFICATIONS = LOAD_RELATIONSHIP_CLASSIFICATIONS;
const LOAD_ENTITY_DATA_STARTED = '@@affectli/entities/relationships/LOAD_ENTITY_DATA_STARTED';
exports.LOAD_ENTITY_DATA_STARTED = LOAD_ENTITY_DATA_STARTED;
const LOAD_ENTITY_DATA = '@@affectli/entities/relationships/LOAD_ENTITY_DATA';
exports.LOAD_ENTITY_DATA = LOAD_ENTITY_DATA;

const loadEntityData = (id, entityType) => {
  const type = entityType === 'custom' ? 'customEntity' : entityType;
  return (0, _actionUtils.loadData)(LOAD_ENTITY_DATA_STARTED, LOAD_ENTITY_DATA, (0, _entityDataQueryBuilder.default)({
    type,
    id
  }))({});
};
/**
 * Loads the suggestions for the person autocomplete component.
 */


exports.loadEntityData = loadEntityData;
const loadRelationDefinitionAutocomplete = (0, _actionUtils.loadData)(LOAD_RELATION_DEFINITION_AUTOCOMPLETE_STARTED, LOAD_RELATION_DEFINITION_AUTOCOMPLETE, _relationDefinitionAutocompleteQuery.default);
exports.loadRelationDefinitionAutocomplete = loadRelationDefinitionAutocomplete;

const buildRelationshipWhere = (entityId, type1, type2, isAdmin = false, direction = true) => {
  const eType = type1 === 'custom' ? 'customEntity' : type1;
  const eType2 = type2 === 'custom' ? 'customEntity' : type2;
  const where = [{
    field: `${eType}${direction ? 1 : 2}.id`,
    op: '=',
    value: entityId
  }, {
    field: `relationDefinition.entityType${direction ? 1 : 2}`,
    op: '=',
    value: type1
  }, {
    field: `relationDefinition.entityType${direction ? 2 : 1}`,
    op: '=',
    value: type2
  }, {
    field: `${eType2}${direction ? 2 : 1}.id`,
    op: 'is not null'
  }];

  if (!isAdmin) {
    where.push({
      field: 'relationDefinition.customEntity.active',
      op: '=',
      value: true
    });
  }

  return where;
};

const updateRelationship = record => {
  return (0, _actionUtils.mutateData)(UPDATE_RELATIONSHIP_STARTED, UPDATE_RELATIONSHIP, _updateRelationMutation.default, 'Relationship updated')({
    record
  });
};
/**
 * Loads the relationships related to an Entity for the DataTable.
 *
 * @param entityId the entity ID
 * @param type1 the entity type
 * @param type2 related entity type
 * @param options the base URI
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 * @param isAdmin boolean is user an admin
 */


exports.updateRelationship = updateRelationship;

const fetchEntityRelationships = (entityId, type1, type2, options, isAdmin = false) => {
  const variables = new _OptionsBuilder.default(options, {
    legacyWhere: true
  }).filter({
    or: [buildRelationshipWhere(entityId, type1, type2, isAdmin, true), buildRelationshipWhere(entityId, type1, type2, isAdmin, false)]
  }).build();
  return (0, _actionUtils.loadTableData)(GET_RELATIONSHIPS_STARTED, GET_RELATIONSHIPS, _relationshipsQuery.default)(variables);
};
/**
 * Delete the relation with the given ID.
 *
 * @param id the relation ID.
 */


exports.fetchEntityRelationships = fetchEntityRelationships;

const deleteRelationship = id => {
  return (0, _actionUtils.mutateData)(REMOVE_RELATIONSHIP_STARTED, REMOVE_RELATIONSHIP, _deleteRelationMutation.default, 'Relationship removed')({
    id
  });
};
/**
 * Save a relationship between two entities.
 *
 * @param record record to save
 */


exports.deleteRelationship = deleteRelationship;

const createRelationship = record => {
  return (0, _actionUtils.mutateData)(ADD_RELATIONSHIP_STARTED, ADD_RELATIONSHIP, _createRelationMutation.default, 'Relationship added')({
    record
  });
};

exports.createRelationship = createRelationship;
const entitiesQueryType = {
  thing: 'things',
  person: 'people',
  organisation: 'organisations',
  custom: 'customEntities',
  task: 'tasks',
  process: 'processes'
};

const loadRelationshipAddEntities = (options, type = 'entity') => {
  const nType = type === 'custom' ? 'customEntity' : type;
  const nQuery = entitiesQueryType[type] || 'entities';
  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).build();
  return (0, _actionUtils.loadData)(LOAD_RELATIONSHIP_ENTITIES_ADD_STARTED, LOAD_RELATIONSHIP_ENTITIES_ADD, (0, _addRelationshipsQuery.default)(nType, nQuery))({ ...variables,
    startIndex: options.startIndex
  });
};

exports.loadRelationshipAddEntities = loadRelationshipAddEntities;

const loadRelationship = id => (0, _actionUtils.loadData)(GET_RELATIONSHIP_STARTED, GET_RELATIONSHIP, _singleRelationshipQuery.default)({
  id
});

exports.loadRelationship = loadRelationship;

const loadClassificationAttributes = ({
  id
}) => (0, _actionUtils.loadData)(LOAD_RELATIONSHIP_CLASSIFICATIONS_STARTED, LOAD_RELATIONSHIP_CLASSIFICATIONS, _relationshipClassificationsQuery.default)({
  id
});

exports.loadClassificationAttributes = loadClassificationAttributes;