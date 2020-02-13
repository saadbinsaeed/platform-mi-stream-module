"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savePerson = exports.loadPerson = exports.loadPeopleList = exports.loadPersonAutocomplete = exports.LOAD_PERSON_AUTOCOMPLETE = exports.LOAD_PERSON_AUTOCOMPLETE_STARTED = exports.OPEN_PERSON = exports.OPEN_PERSON_STARTED = exports.UPDATE_PERSON = exports.UPDATE_PERSON_STARTED = exports.LOAD_PERSON = exports.LOAD_PERSON_STARTED = exports.LOAD_PEOPLE_LIST = exports.LOAD_PEOPLE_LIST_STARTED = void 0;

var _lo = require("app/utils/lo/lo");

var _actionUtils = require("app/utils/redux/action-utils");

var _personAutocompleteQuery = _interopRequireDefault(require("graphql/entities/people/personAutocompleteQuery"));

var _peopleQuery = _interopRequireDefault(require("graphql/entities/people/peopleQuery"));

var _personQueryBuilder = _interopRequireDefault(require("graphql/entities/people/personQueryBuilder"));

var _savePersonMutation = _interopRequireDefault(require("graphql/entities/people/savePersonMutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_PEOPLE_LIST_STARTED = '@@affectli/entities/people/LOAD_PEOPLE_LIST_STARTED';
exports.LOAD_PEOPLE_LIST_STARTED = LOAD_PEOPLE_LIST_STARTED;
const LOAD_PEOPLE_LIST = '@@affectli/entities/people/LOAD_PEOPLE_LIST';
exports.LOAD_PEOPLE_LIST = LOAD_PEOPLE_LIST;
const LOAD_PERSON_STARTED = '@@affectli/entities/people/LOAD_PERSON_STARTED';
exports.LOAD_PERSON_STARTED = LOAD_PERSON_STARTED;
const LOAD_PERSON = '@@affectli/entities/people/LOAD_PERSON';
exports.LOAD_PERSON = LOAD_PERSON;
const UPDATE_PERSON_STARTED = '@@affectli/entities/people/UPDATE_PERSON_STARTED';
exports.UPDATE_PERSON_STARTED = UPDATE_PERSON_STARTED;
const UPDATE_PERSON = '@@affectli/entities/people/UPDATE_PERSON';
exports.UPDATE_PERSON = UPDATE_PERSON;
const OPEN_PERSON_STARTED = '@@affectli/entities/people/OPEN_PERSON_STARTED';
exports.OPEN_PERSON_STARTED = OPEN_PERSON_STARTED;
const OPEN_PERSON = '@@affectli/entities/people/OPEN_PERSON';
exports.OPEN_PERSON = OPEN_PERSON;
const LOAD_PERSON_AUTOCOMPLETE_STARTED = '@@affectli/entities/people/LOAD_PERSON_AUTOCOMPLETE_STARTED';
exports.LOAD_PERSON_AUTOCOMPLETE_STARTED = LOAD_PERSON_AUTOCOMPLETE_STARTED;
const LOAD_PERSON_AUTOCOMPLETE = '@@affectli/entities/people/LOAD_PERSON_AUTOCOMPLETE';
/**
 * Loads the suggestions for the person autocomplete component.
 */

exports.LOAD_PERSON_AUTOCOMPLETE = LOAD_PERSON_AUTOCOMPLETE;
const loadPersonAutocomplete = (0, _actionUtils.loadData)(LOAD_PERSON_AUTOCOMPLETE_STARTED, LOAD_PERSON_AUTOCOMPLETE, _personAutocompleteQuery.default);
/**
 * load people list for datatable
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */

exports.loadPersonAutocomplete = loadPersonAutocomplete;
const loadPeopleList = (0, _actionUtils.loadTableData)(LOAD_PEOPLE_LIST_STARTED, LOAD_PEOPLE_LIST, _peopleQuery.default);
/**
 * Load the detail of the specified Person
 *
 * @param id the ID of the Person to load
 */

exports.loadPeopleList = loadPeopleList;

const loadPerson = id => (0, _actionUtils.loadData)(LOAD_PERSON_STARTED, LOAD_PERSON, (0, _personQueryBuilder.default)(Number(id)))({
  id
});

exports.loadPerson = loadPerson;

const savePerson = record => (0, _actionUtils.mutateData)(UPDATE_PERSON_STARTED, UPDATE_PERSON, _savePersonMutation.default, !(0, _lo.get)(record, 'id', false) ? 'Person added.' : 'Person updated.')({
  record
});

exports.savePerson = savePerson;