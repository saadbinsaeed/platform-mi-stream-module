"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveEntityAttributes = exports.loadEntityClassesAndAttributes = exports.normalizeClass = exports.UPDATE_ENTITY_ATTRIBUTES = exports.UPDATE_ENTITY_ATTRIBUTES_STARTED = exports.LOAD_ENTITY_CLASSES_AND_ATTRIBUTES = exports.LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _actionUtils = require("app/utils/redux/action-utils");

var _entityClassesAttributesQuery = _interopRequireDefault(require("graphql/entities/common/classifications/entityClassesAttributesQuery"));

var _saveEntityMutation = _interopRequireDefault(require("graphql/entities/entities/saveEntityMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED = '@@affectli/entities/common/classifications/LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED';
exports.LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED = LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED;
const LOAD_ENTITY_CLASSES_AND_ATTRIBUTES = '@@affectli/entities/common/classifications/LOAD_ENTITY_CLASSES_AND_ATTRIBUTES';
exports.LOAD_ENTITY_CLASSES_AND_ATTRIBUTES = LOAD_ENTITY_CLASSES_AND_ATTRIBUTES;
const UPDATE_ENTITY_ATTRIBUTES_STARTED = '@@affectli/entities/common/classifications/UPDATE_ENTITY_ATTRIBUTES_STARTED';
exports.UPDATE_ENTITY_ATTRIBUTES_STARTED = UPDATE_ENTITY_ATTRIBUTES_STARTED;
const UPDATE_ENTITY_ATTRIBUTES = '@@affectli/entities/common/classifications/UPDATE_ENTITY_ATTRIBUTES';
exports.UPDATE_ENTITY_ATTRIBUTES = UPDATE_ENTITY_ATTRIBUTES;

const normalizeClass = classification => {
  const fields = (classification.formDefinitions || {}).fields || []; // get the fields' groups names removing the duplicates

  const fieldGroupsNames = Array.from(new Set(fields.map(({
    group_name
  }) => group_name || 'Ungrouped')));
  return { ...classification,
    groups: fieldGroupsNames.map(name => ({
      name: name,
      fields: fields.filter(({
        group_name
      }) => (group_name || 'Ungrouped') === name)
    }))
  };
};

exports.normalizeClass = normalizeClass;

const _loadEntityAttrClasses = id => {
  if (!id) {
    return Promise.resolve(null);
  }

  return _client.graphql.query({
    query: _entityClassesAttributesQuery.default,
    variables: {
      id
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    const data = (0, _Immutable.default)((0, _lo.get)(response, 'data.result') || []);
    const classes = (data.classes || []).map(normalizeClass);
    return { ...data,
      classes
    };
  });
};

const loadEntityClassesAndAttributes = id => (dispatch, getState) => {
  dispatch({
    type: LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED
  });
  return _loadEntityAttrClasses(id).then(data => {
    dispatch({
      type: LOAD_ENTITY_CLASSES_AND_ATTRIBUTES,
      payload: (0, _Immutable.default)(data)
    });
    return (0, _Immutable.default)(data);
  }).catch((0, _actionUtils.dispatchError)(dispatch, LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED));
};

exports.loadEntityClassesAndAttributes = loadEntityClassesAndAttributes;

const saveEntityAttributes = (id, attributes) => (0, _actionUtils.mutateData)(UPDATE_ENTITY_ATTRIBUTES_STARTED, UPDATE_ENTITY_ATTRIBUTES, _saveEntityMutation.default, 'Attributes updated.')({
  record: {
    id,
    attributes
  }
});

exports.saveEntityAttributes = saveEntityAttributes;