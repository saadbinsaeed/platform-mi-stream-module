"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadOrganisationChildren = exports.loadOrganisationsList = exports.saveOrganisation = exports.loadOrganisation = exports.loadOrganisationAutocomplete = exports.LOAD_ORGANISATION_AUTOCOMPLETE = exports.LOAD_ORGANISATION_AUTOCOMPLETE_STARTED = exports.LOAD_ORGANISATION = exports.LOAD_ORGANISATION_STARTED = exports.LOAD_ORGANISATIONS = exports.LOAD_ORGANISATIONS_STARTED = exports.LOAD_ORGANISATION_CHILDREN = exports.LOAD_ORGANISATION_CHILDREN_STARTED = exports.SAVE_ORGANISATION = exports.SAVE_ORGANISATION_STARTED = void 0;

var _actionUtils = require("app/utils/redux/action-utils");

var _lo = require("app/utils/lo/lo");

var _organisationAutocompleteQuery = _interopRequireDefault(require("graphql/entities/organisations/organisationAutocompleteQuery"));

var _organisationsQuery = _interopRequireDefault(require("graphql/entities/organisations/organisationsQuery"));

var _organisationQueryBuilder = _interopRequireDefault(require("graphql/entities/organisations/organisationQueryBuilder"));

var _saveOrganisationMutation = _interopRequireDefault(require("graphql/entities/organisations/saveOrganisationMutation"));

var _organisationChildrenQuery = _interopRequireDefault(require("graphql/entities/organisations/organisationChildrenQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SAVE_ORGANISATION_STARTED = '@@affectli/entities/organisation/SAVE_ORGANISATION_STARTED';
exports.SAVE_ORGANISATION_STARTED = SAVE_ORGANISATION_STARTED;
const SAVE_ORGANISATION = '@@affectli/entities/organisation/SAVE_ORGANISATION';
exports.SAVE_ORGANISATION = SAVE_ORGANISATION;
const LOAD_ORGANISATION_CHILDREN_STARTED = '@@affectli/entities/organisation/LOAD_ORGANISATION_CHILDREN_STARTED';
exports.LOAD_ORGANISATION_CHILDREN_STARTED = LOAD_ORGANISATION_CHILDREN_STARTED;
const LOAD_ORGANISATION_CHILDREN = '@@affectli/entities/organisation/LOAD_ORGANISATION_CHILDREN';
exports.LOAD_ORGANISATION_CHILDREN = LOAD_ORGANISATION_CHILDREN;
const LOAD_ORGANISATIONS_STARTED = '@@affectli/entities/organisations/LOAD_ORGANISATIONS_STARTED';
exports.LOAD_ORGANISATIONS_STARTED = LOAD_ORGANISATIONS_STARTED;
const LOAD_ORGANISATIONS = '@@affectli/entities/organisations/LOAD_ORGANISATIONS';
exports.LOAD_ORGANISATIONS = LOAD_ORGANISATIONS;
const LOAD_ORGANISATION_STARTED = '@@affectli/entities/organisation/LOAD_ORGANISATION_STARTED';
exports.LOAD_ORGANISATION_STARTED = LOAD_ORGANISATION_STARTED;
const LOAD_ORGANISATION = '@@affectli/entities/organisation/LOAD_ORGANISATION';
exports.LOAD_ORGANISATION = LOAD_ORGANISATION;
const LOAD_ORGANISATION_AUTOCOMPLETE_STARTED = '@@affectli/users/LOAD_ORGANISATION_AUTOCOMPLETE_STARTED';
exports.LOAD_ORGANISATION_AUTOCOMPLETE_STARTED = LOAD_ORGANISATION_AUTOCOMPLETE_STARTED;
const LOAD_ORGANISATION_AUTOCOMPLETE = '@@affectli/users/LOAD_ORGANISATION_AUTOCOMPLETE';
/**
 * Loads the suggestions for the organisation autocomplete component.
 */

exports.LOAD_ORGANISATION_AUTOCOMPLETE = LOAD_ORGANISATION_AUTOCOMPLETE;
const loadOrganisationAutocomplete = (0, _actionUtils.loadData)(LOAD_ORGANISATION_AUTOCOMPLETE_STARTED, LOAD_ORGANISATION_AUTOCOMPLETE, _organisationAutocompleteQuery.default);
/**
 * Load the detail of the specified Organisation
 *
 * @param id the ID of the Organisation to load
 */

exports.loadOrganisationAutocomplete = loadOrganisationAutocomplete;

const loadOrganisation = id => (0, _actionUtils.loadData)(LOAD_ORGANISATION_STARTED, LOAD_ORGANISATION, (0, _organisationQueryBuilder.default)(Number(id)))({
  id
});

exports.loadOrganisation = loadOrganisation;

const saveOrganisation = record => (0, _actionUtils.mutateData)(SAVE_ORGANISATION_STARTED, SAVE_ORGANISATION, _saveOrganisationMutation.default, !(0, _lo.get)(record, 'id', false) ? 'Organisation added.' : 'Organisation updated.')({
  record
});
/**
 * Load organisations
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */


exports.saveOrganisation = saveOrganisation;
const loadOrganisationsList = (0, _actionUtils.loadTableData)(LOAD_ORGANISATIONS_STARTED, LOAD_ORGANISATIONS, _organisationsQuery.default);
/**
 * Load the children of the specified Thing.
 *
 * @param id parents id
 */

exports.loadOrganisationsList = loadOrganisationsList;

const loadOrganisationChildren = id => (0, _actionUtils.loadData)(LOAD_ORGANISATION_CHILDREN_STARTED, LOAD_ORGANISATION_CHILDREN, _organisationChildrenQuery.default)({
  id,
  filterBy: [{
    field: 'parent.id',
    op: '=',
    value: id
  }]
});

exports.loadOrganisationChildren = loadOrganisationChildren;