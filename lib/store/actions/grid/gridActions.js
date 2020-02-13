"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadOrganisationsDropdownForGrid = exports.loadGroupDropdownOptions = exports.loadClassificationsDropDownForGrid = exports.saveDataTableState = exports.SAVE_DATATABLE_STATUS = exports.LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID = exports.LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID_STARTED = exports.LOAD_GROUP_DROPDOWN_OPTIONS = exports.LOAD_GROUP_DROPDOWN_OPTIONS_STARTED = exports.LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID = exports.LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID_STARTED = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("app/utils/lo/lo");

var _client = require("graphql/client");

var _classificationsSelectQuery = _interopRequireDefault(require("graphql/entities/classifications/classificationsSelectQuery"));

var _groupsSelectQuery = _interopRequireDefault(require("graphql/groups/groupsSelectQuery"));

var _organisationsSelectQuery = _interopRequireDefault(require("graphql/entities/entities/organisationsSelectQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID_STARTED = '@@affectli/entities/things/classifications/LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID_STARTED';
exports.LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID_STARTED = LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID_STARTED;
const LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID = '@@affectli/entities/things/classifications/LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID';
exports.LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID = LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID;
const LOAD_GROUP_DROPDOWN_OPTIONS_STARTED = '@@affectli/entities/things/classifications/LOAD_GROUP_DROPDOWN_OPTIONS_STARTED';
exports.LOAD_GROUP_DROPDOWN_OPTIONS_STARTED = LOAD_GROUP_DROPDOWN_OPTIONS_STARTED;
const LOAD_GROUP_DROPDOWN_OPTIONS = '@@affectli/entities/things/classifications/LOAD_GROUP_DROPDOWN_OPTIONS';
exports.LOAD_GROUP_DROPDOWN_OPTIONS = LOAD_GROUP_DROPDOWN_OPTIONS;
const LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID_STARTED = '@@affectli/entities/LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID_STARTED';
exports.LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID_STARTED = LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID_STARTED;
const LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID = '@@affectli/entities/LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID';
exports.LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID = LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID;
const SAVE_DATATABLE_STATUS = '@@affectli/grid/status/SAVE_DATATABLE_STATUS';
/**
 * Save the runtime state of a DataTable.
 *
 * @param id the DataTable ID.
 * @param status the DataTable's status.
 */

exports.SAVE_DATATABLE_STATUS = SAVE_DATATABLE_STATUS;

const saveDataTableState = (id, status) => dispatch => {
  if (!id) {
    return;
  }

  dispatch({
    type: SAVE_DATATABLE_STATUS,
    payload: (0, _Immutable.default)({
      id,
      status
    })
  });
};
/**
 * Load classifications for grid header
 *
 * @param variables: { page, itemsPerPage, filterBy, orderBy }
 */


exports.saveDataTableState = saveDataTableState;

const loadClassificationsDropDownForGrid = (variables = {
  page: 1,
  itemsPerPage: 1000,
  filterBy: [{
    field: 'active',
    op: '=',
    value: true
  }]
}) => {
  return dispatch => {
    dispatch({
      type: LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID_STARTED
    });

    _client.graphql.query({
      query: _classificationsSelectQuery.default,
      variables,
      fetchPolicy: 'no-cache'
    }).then(response => {
      dispatch({
        type: LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID,
        payload: (0, _Immutable.default)((0, _lo.get)(response, 'data'))
      });
    }).catch(error => {
      dispatch({
        type: LOAD_CLASSIFICATIONS_DROPDOWN_FOR_GRID,
        payload: error,
        error: true
      });
    });
  };
};

exports.loadClassificationsDropDownForGrid = loadClassificationsDropDownForGrid;

const loadGroupDropdownOptions = ({
  page = 1,
  pageSize = 1000,
  orderBy,
  where,
  fields
} = {}) => {
  return dispatch => {
    dispatch({
      type: LOAD_GROUP_DROPDOWN_OPTIONS_STARTED
    });

    _client.graphql.query({
      query: _groupsSelectQuery.default,
      variables: {
        page,
        pageSize,
        orderBy,
        where,
        fields
      },
      fetchPolicy: 'no-cache'
    }).then(response => {
      dispatch({
        type: LOAD_GROUP_DROPDOWN_OPTIONS,
        payload: (0, _Immutable.default)((0, _lo.get)(response, 'data'))
      });
    }).catch(error => {
      dispatch({
        type: LOAD_GROUP_DROPDOWN_OPTIONS,
        payload: error,
        error: true
      });
    });
  };
};

exports.loadGroupDropdownOptions = loadGroupDropdownOptions;

const loadOrganisationsDropdownForGrid = (variables = {}) => {
  return dispatch => {
    dispatch({
      type: LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID_STARTED
    });
    const filterByNullName = {
      field: 'name',
      op: 'is not null'
    };

    if (variables.where) {
      variables.where.push(filterByNullName);
    } else {
      variables.where = [filterByNullName];
    }

    const orderByName = {
      field: 'name',
      direction: 'asc'
    };

    if (variables.orderBy) {
      variables.orderBy.push(orderByName);
    } else {
      variables.orderBy = [orderByName];
    }

    _client.graphql.query({
      query: _organisationsSelectQuery.default,
      variables,
      fetchPolicy: 'no-cache'
    }).then(response => {
      dispatch({
        type: LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID,
        payload: (0, _Immutable.default)((0, _lo.get)(response, 'data'))
      });
    }).catch(error => {
      dispatch({
        type: LOAD_ORGANISATIONS_DROPDOWN_FOR_GRID,
        payload: error,
        error: true
      });
    });
  };
};

exports.loadOrganisationsDropdownForGrid = loadOrganisationsDropdownForGrid;