"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shareFormDefinition = exports.deleteFormDefinition = exports.cloneFormDefinition = exports.updateFormDefinition = exports.createFormDefinition = exports.loadFormDefinition = exports.loadDesignerForms = exports.SHARE_FORM_DEFINITION = exports.SHARE_FORM_DEFINITION_STARTED = exports.DELETE_FORM_DEFINITION = exports.DELETE_FORM_DEFINITION_STARTED = exports.CLONE_FORM_DEFINITION = exports.CLONE_FORM_DEFINITION_STARTED = exports.UPDATE_FORM_DEFINITION = exports.UPDATE_FORM_DEFINITION_STARTED = exports.CREATE_FORM_DEFINITION = exports.CREATE_FORM_DEFINITION_STARTED = exports.LOAD_FORM_DEFINITION = exports.LOAD_FORM_DEFINITION_STARTED = exports.LOAD_FORMS_DEFINITIONS = exports.LOAD_FORMS_DEFINITIONS_STARTED = void 0;

var _actionUtils = require("app/utils/redux/action-utils");

var _OptionsBuilder = _interopRequireDefault(require("app/utils/api/OptionsBuilder"));

var _formDefinitionQuery = _interopRequireDefault(require("graphql/designer/formDefinitionQuery"));

var _designerFormListQuery = _interopRequireDefault(require("graphql/designer/designerFormListQuery"));

var _createFormDefinitionMutation = _interopRequireDefault(require("graphql/designer/createFormDefinitionMutation"));

var _cloneFormDefinitionMutation = _interopRequireDefault(require("graphql/designer/cloneFormDefinitionMutation"));

var _deleteFormDefinitionMutation = _interopRequireDefault(require("graphql/designer/deleteFormDefinitionMutation"));

var _updateFormDefinitionMutation = _interopRequireDefault(require("graphql/designer/updateFormDefinitionMutation"));

var _shareFormDefinitionMutation = _interopRequireDefault(require("graphql/designer/shareFormDefinitionMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_FORMS_DEFINITIONS_STARTED = '@@affectli/designer/LOAD_DESIGNER_FORMS_STARTED';
exports.LOAD_FORMS_DEFINITIONS_STARTED = LOAD_FORMS_DEFINITIONS_STARTED;
const LOAD_FORMS_DEFINITIONS = '@@affectli/designer/LOAD_DESIGNER_FORMS';
exports.LOAD_FORMS_DEFINITIONS = LOAD_FORMS_DEFINITIONS;
const LOAD_FORM_DEFINITION_STARTED = '@@affectli/designer/LOAD_FORM_DEFINITION_STARTED';
exports.LOAD_FORM_DEFINITION_STARTED = LOAD_FORM_DEFINITION_STARTED;
const LOAD_FORM_DEFINITION = '@@affectli/designer/LOAD_FORM_DEFINITION';
exports.LOAD_FORM_DEFINITION = LOAD_FORM_DEFINITION;
const CREATE_FORM_DEFINITION_STARTED = '@@affectli/designer/CREATE_FORM_DEFINITION_STARTED';
exports.CREATE_FORM_DEFINITION_STARTED = CREATE_FORM_DEFINITION_STARTED;
const CREATE_FORM_DEFINITION = '@@affectli/designer/CREATE_FORM_DEFINITION';
exports.CREATE_FORM_DEFINITION = CREATE_FORM_DEFINITION;
const UPDATE_FORM_DEFINITION_STARTED = '@@affectli/designer/UPDATE_FORM_DEFINITION_STARTED';
exports.UPDATE_FORM_DEFINITION_STARTED = UPDATE_FORM_DEFINITION_STARTED;
const UPDATE_FORM_DEFINITION = '@@affectli/designer/UPDATE_FORM_DEFINITION';
exports.UPDATE_FORM_DEFINITION = UPDATE_FORM_DEFINITION;
const CLONE_FORM_DEFINITION_STARTED = '@@affectli/designer/CLONE_FORM_DEFINITION_STARTED';
exports.CLONE_FORM_DEFINITION_STARTED = CLONE_FORM_DEFINITION_STARTED;
const CLONE_FORM_DEFINITION = '@@affectli/designer/CLONE_FORM_DEFINITION';
exports.CLONE_FORM_DEFINITION = CLONE_FORM_DEFINITION;
const DELETE_FORM_DEFINITION_STARTED = '@@affectli/designer/DELETE_FORM_DEFINITION_STARTED';
exports.DELETE_FORM_DEFINITION_STARTED = DELETE_FORM_DEFINITION_STARTED;
const DELETE_FORM_DEFINITION = '@@affectli/designer/DELETE_FORM_DEFINITION';
exports.DELETE_FORM_DEFINITION = DELETE_FORM_DEFINITION;
const SHARE_FORM_DEFINITION_STARTED = '@@affectli/designer/SHARE_FORM_DEFINITION_STARTED';
exports.SHARE_FORM_DEFINITION_STARTED = SHARE_FORM_DEFINITION_STARTED;
const SHARE_FORM_DEFINITION = '@@affectli/designer/SHARE_FORM_DEFINITION';
/**
 * Loads the forms' definitions.
 */

exports.SHARE_FORM_DEFINITION = SHARE_FORM_DEFINITION;

const loadDesignerForms = (options = {}) => {
  const variables = new _OptionsBuilder.default(options).defaultStartStopIndexs(0, 30).filter({
    field: 'definition.version',
    op: 'is not null'
  }).build();
  return (0, _actionUtils.loadData)(LOAD_FORMS_DEFINITIONS_STARTED, LOAD_FORMS_DEFINITIONS, _designerFormListQuery.default)({ ...variables,
    startIndex: options.startIndex
  });
};
/**
 * Loads the form definition with the given id.
 */


exports.loadDesignerForms = loadDesignerForms;

const loadFormDefinition = id => (0, _actionUtils.loadData)(LOAD_FORM_DEFINITION_STARTED, LOAD_FORM_DEFINITION, _formDefinitionQuery.default)({
  id
});
/**
 * Creates a new the form definition.
 */


exports.loadFormDefinition = loadFormDefinition;

const createFormDefinition = record => (0, _actionUtils.mutateData)(CREATE_FORM_DEFINITION_STARTED, CREATE_FORM_DEFINITION, _createFormDefinitionMutation.default, 'Form created succesfully.')({
  record
});
/**
 * Updates a form definition.
 */


exports.createFormDefinition = createFormDefinition;

const updateFormDefinition = (record, newVersion, overwriteDeployed) => (0, _actionUtils.mutateData)(UPDATE_FORM_DEFINITION_STARTED, UPDATE_FORM_DEFINITION, _updateFormDefinitionMutation.default, 'Form updated succesfully.')({
  record,
  newVersion,
  overwriteDeployed
});
/**
 * Creates a new the form definition.
 */


exports.updateFormDefinition = updateFormDefinition;

const cloneFormDefinition = (id, record) => (0, _actionUtils.mutateData)(CLONE_FORM_DEFINITION_STARTED, CLONE_FORM_DEFINITION, _cloneFormDefinitionMutation.default, 'Form duplicated succesfully.')({
  id,
  record
});
/**
 * Creates a new the form definition.
 */


exports.cloneFormDefinition = cloneFormDefinition;

const deleteFormDefinition = (id, record) => (0, _actionUtils.mutateData)(DELETE_FORM_DEFINITION_STARTED, DELETE_FORM_DEFINITION, _deleteFormDefinitionMutation.default, 'Form deleted succesfully.')({
  id,
  record
});
/**
 * Creates a new the form definition.
 */


exports.deleteFormDefinition = deleteFormDefinition;

const shareFormDefinition = (id, shares) => (0, _actionUtils.mutateData)(SHARE_FORM_DEFINITION_STARTED, SHARE_FORM_DEFINITION, _shareFormDefinitionMutation.default, 'Form shared succesfully.')({
  id,
  shares: shares.map(({
    user,
    permission
  }) => ({
    user: {
      id: user.id
    },
    permission
  }))
});

exports.shareFormDefinition = shareFormDefinition;