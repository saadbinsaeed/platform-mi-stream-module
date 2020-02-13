"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadClassifications = exports.createClassification = exports.updateClassification = exports.loadClassificationEntities = exports.loadClassification = exports.loadClassificationAutocomplete = exports.LOAD_CLASSIFICATION_AUTOCOMPLETE = exports.LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED = exports.LOAD_CLASSIFICATION_ENTITIES = exports.LOAD_CLASSIFICATION_ENTITIES_STARTED = exports.LOAD_CLASSIFICATION = exports.LOAD_CLASSIFICATION_STARTED = exports.LOAD_CLASSIFICATIONS = exports.LOAD_CLASSIFICATIONS_STARTED = exports.CREATE_CLASSIFICATION = exports.CREATE_CLASSIFICATION_STARTED = exports.UPDATE_CLASSIFICATION = exports.UPDATE_CLASSIFICATION_STARTED = exports.UPDATE_ENTITY_CLASSIFICATION = void 0;

var _History = _interopRequireDefault(require("store/History"));

var _actionUtils = require("app/utils/redux/action-utils");

var _classificationAutocompleteQuery = _interopRequireDefault(require("graphql/entities/classifications/classificationAutocompleteQuery"));

var _classificationsQuery = _interopRequireDefault(require("graphql/entities/classifications/classificationsQuery"));

var _classificationDetailQuery = _interopRequireDefault(require("graphql/entities/classifications/classificationDetailQuery"));

var _createClassificationMutation = _interopRequireDefault(require("graphql/entities/classifications/createClassificationMutation"));

var _updateClassificationMutation = _interopRequireDefault(require("graphql/entities/classifications/updateClassificationMutation"));

var _entitiesQuery = _interopRequireDefault(require("graphql/entities/entities/entitiesQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UPDATE_ENTITY_CLASSIFICATION = '@@affectli/classifications/UPDATE_ENTITY_CLASSIFICATION';
exports.UPDATE_ENTITY_CLASSIFICATION = UPDATE_ENTITY_CLASSIFICATION;
const UPDATE_CLASSIFICATION_STARTED = '@@affectli/classifications/UPDATE_CLASSIFICATION_STARTED';
exports.UPDATE_CLASSIFICATION_STARTED = UPDATE_CLASSIFICATION_STARTED;
const UPDATE_CLASSIFICATION = '@@affectli/classifications/UPDATE_CLASSIFICATION';
exports.UPDATE_CLASSIFICATION = UPDATE_CLASSIFICATION;
const CREATE_CLASSIFICATION_STARTED = '@@affectli/classifications/CREATE_CLASSIFICATION_STARTED';
exports.CREATE_CLASSIFICATION_STARTED = CREATE_CLASSIFICATION_STARTED;
const CREATE_CLASSIFICATION = '@@affectli/classifications/CREATE_CLASSIFICATION';
exports.CREATE_CLASSIFICATION = CREATE_CLASSIFICATION;
const LOAD_CLASSIFICATIONS_STARTED = '@@affectli/classifications/LOAD_CLASSIFICATIONS_STARTED';
exports.LOAD_CLASSIFICATIONS_STARTED = LOAD_CLASSIFICATIONS_STARTED;
const LOAD_CLASSIFICATIONS = '@@affectli/classifications/LOAD_CLASSIFICATIONS';
exports.LOAD_CLASSIFICATIONS = LOAD_CLASSIFICATIONS;
const LOAD_CLASSIFICATION_STARTED = '@@affectli/classifications/LOAD_CLASSIFICATION_STARTED';
exports.LOAD_CLASSIFICATION_STARTED = LOAD_CLASSIFICATION_STARTED;
const LOAD_CLASSIFICATION = '@@affectli/classifications/LOAD_CLASSIFICATION';
exports.LOAD_CLASSIFICATION = LOAD_CLASSIFICATION;
const LOAD_CLASSIFICATION_ENTITIES_STARTED = '@@affectli/classifications/entities/LOAD_CLASSIFICATION_ENTITIES_STARTED';
exports.LOAD_CLASSIFICATION_ENTITIES_STARTED = LOAD_CLASSIFICATION_ENTITIES_STARTED;
const LOAD_CLASSIFICATION_ENTITIES = '@@affectli/classifications/LOAD_CLASSIFICATION_ENTITIES';
exports.LOAD_CLASSIFICATION_ENTITIES = LOAD_CLASSIFICATION_ENTITIES;
const LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED = '@@affectli/admin/groups/LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED';
exports.LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED = LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED;
const LOAD_CLASSIFICATION_AUTOCOMPLETE = '@@affectli/admin/groups/LOAD_CLASSIFICATION_AUTOCOMPLETE';
/**
 * Loads the suggestions for the person autocomplete component.
 */

exports.LOAD_CLASSIFICATION_AUTOCOMPLETE = LOAD_CLASSIFICATION_AUTOCOMPLETE;
const loadClassificationAutocomplete = (0, _actionUtils.loadData)(LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED, LOAD_CLASSIFICATION_AUTOCOMPLETE, _classificationAutocompleteQuery.default);
/**
 * This function will load the classification detail on a given id
 */

exports.loadClassificationAutocomplete = loadClassificationAutocomplete;

const loadClassification = id => (0, _actionUtils.loadData)(LOAD_CLASSIFICATION_STARTED, LOAD_CLASSIFICATION, _classificationDetailQuery.default)({
  id
});
/**
 * Load the loads the entities for the DataTable
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download,  })
 */


exports.loadClassification = loadClassification;

const loadClassificationEntities = options => {
  return (0, _actionUtils.loadTableData)(LOAD_CLASSIFICATION_ENTITIES_STARTED, LOAD_CLASSIFICATION_ENTITIES, _entitiesQuery.default)(options);
};

exports.loadClassificationEntities = loadClassificationEntities;

const updateClassification = classification => (dispatch, getState) => {
  /**
   * Problem is that classificationDetailQuery does not provide childrenUris
   * it provides the children object ( which Classification dropdown do not receives ) with id and uri but we cant save that children object as ClassificationUpdateInput of updateClassification requires children to only contain uris or array of childrenUris which classificationDetailQuery does not provide.
   * Solution 1: reducer-utils should allow the user to tranform data to any required format before saving data to the redux store
   * Solution 2: do not use the reducer-utils, make a custom reducer, manipulate the data before saving it to the store
   * solution 3: classificationDetailQuery should provide childrenUris ( array of uri strings )
   * solution 4: Implemented in the below line
   */
  return (0, _actionUtils.mutateData)(UPDATE_CLASSIFICATION_STARTED, UPDATE_CLASSIFICATION, _updateClassificationMutation.default, 'Classifcation updated.')({
    classification
  })(dispatch, getState).then(payload => {
    if (!(payload instanceof Error)) {
      dispatch({
        type: LOAD_CLASSIFICATION,
        payload
      });
    }
  });
};
/**
 * This function will create classification by receiving a classification object
 * Classifification object should only contain "name" and "uri"
 */


exports.updateClassification = updateClassification;

const createClassification = classification => (dispatch, getState) => {
  (0, _actionUtils.mutateData)(CREATE_CLASSIFICATION_STARTED, CREATE_CLASSIFICATION, _createClassificationMutation.default, 'Classifcation created.')({
    classification
  })(dispatch, getState).then(({
    id
  }) => {
    if (id) {
      _History.default.push(`/classifications/${id}`);
    }
  });
};
/**
 * Load classes for DataTable
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */


exports.createClassification = createClassification;
const loadClassifications = (0, _actionUtils.loadTableData)(LOAD_CLASSIFICATIONS_STARTED, LOAD_CLASSIFICATIONS, _classificationsQuery.default);
exports.loadClassifications = loadClassifications;