"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.createUser = exports.loadUserRole = exports.loadUserChangelog = exports.loadUser = exports.loadUserManagement = exports.LOAD_USER_HISTORY = exports.LOAD_USER_HISTORY_STARTED = exports.UPDATE_USER = exports.UPDATE_USER_STARTED = exports.CREATE_USER = exports.CREATE_USER_STARTED = exports.LOAD_ROLE_OF = exports.LOAD_ROLE_STARTED = exports.LOAD_USERS_MANAGEMENT = exports.LOAD_USERS_MANAGEMENT_STARTED = exports.LOAD_USER = exports.LOAD_USER_STARTED = void 0;

var _History = _interopRequireDefault(require("store/History"));

var _client = require("graphql/client");

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _HttpFetch = _interopRequireDefault(require("app/utils/http/HttpFetch"));

var _actionUtils = require("app/utils/redux/action-utils");

var _lo = require("app/utils/lo/lo");

var _usersQuery = _interopRequireDefault(require("graphql/users/usersQuery"));

var _userByReferenceQuery = _interopRequireDefault(require("graphql/app/userByReferenceQuery"));

var _saveUserMutation = _interopRequireDefault(require("graphql/entities/users/saveUserMutation"));

var _userChangelogQuery = _interopRequireDefault(require("graphql/users/userChangelogQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_USER_STARTED = '@@affectli/admin/users/LOAD_USER_STARTED';
exports.LOAD_USER_STARTED = LOAD_USER_STARTED;
const LOAD_USER = '@@affectli/admin/users/LOAD_USER';
exports.LOAD_USER = LOAD_USER;
const LOAD_USERS_MANAGEMENT_STARTED = '@@affectli/admin/users/LOAD_USERS_MANAGEMENT_STARTED';
exports.LOAD_USERS_MANAGEMENT_STARTED = LOAD_USERS_MANAGEMENT_STARTED;
const LOAD_USERS_MANAGEMENT = '@@affectli/admin/users/LOAD_USERS_MANAGEMENT';
exports.LOAD_USERS_MANAGEMENT = LOAD_USERS_MANAGEMENT;
const LOAD_ROLE_STARTED = '@@affectli/admin/users/LOAD_ROLE_STARTED';
exports.LOAD_ROLE_STARTED = LOAD_ROLE_STARTED;
const LOAD_ROLE_OF = '@@affectli/admin/users/LOAD_ROLE_OF';
exports.LOAD_ROLE_OF = LOAD_ROLE_OF;
const CREATE_USER_STARTED = '@@affectli/admin/users/CREATE_USER_STARTED';
exports.CREATE_USER_STARTED = CREATE_USER_STARTED;
const CREATE_USER = '@@affectli/admin/users/CREATE_USER';
exports.CREATE_USER = CREATE_USER;
const UPDATE_USER_STARTED = '@@affectli/admin/users/UPDATE_USER_STARTED';
exports.UPDATE_USER_STARTED = UPDATE_USER_STARTED;
const UPDATE_USER = '@@affectli/admin/users/UPDATE_USER';
exports.UPDATE_USER = UPDATE_USER;
const LOAD_USER_HISTORY_STARTED = '@@affectli/admin/users/LOAD_USER_HISTORY_STARTED';
exports.LOAD_USER_HISTORY_STARTED = LOAD_USER_HISTORY_STARTED;
const LOAD_USER_HISTORY = '@@affectli/admin/users/LOAD_USER_HISTORY';
/**
 * Loads the users for the DataTable
 *
 * @param options the options ({ page, pageSize, countMax, where, orderBy, download })
 */

exports.LOAD_USER_HISTORY = LOAD_USER_HISTORY;
const loadUserManagement = (0, _actionUtils.loadTableData)(LOAD_USERS_MANAGEMENT_STARTED, LOAD_USERS_MANAGEMENT, _usersQuery.default);
/**
 * Load the detail of the specified User
 *
 * @param user the name of the User to load
 */

exports.loadUserManagement = loadUserManagement;

const loadUser = login => (0, _actionUtils.loadData)(LOAD_USER_STARTED, LOAD_USER, _userByReferenceQuery.default)({
  reference: {
    login
  },
  id: login
});
/**
 * Fetch the user changelog.
 *
 * @param login the entity login.
 * @param id the entity ID.
 * @param options the filter options.
 */


exports.loadUser = loadUser;

const loadUserChangelog = (login, id, options) => dispatch => {
  dispatch({
    type: LOAD_USER_HISTORY_STARTED
  });
  return _client.graphql.query({
    query: _userChangelogQuery.default,
    variables: {
      reference: {
        login
      },
      id: String(id),
      ...options
    },
    fetchPolicy: 'no-cache'
  }).then(response => {
    const payload = {
      changes: (0, _lo.get)(response, 'data.userByReference.changelog'),
      startIndex: options.startIndex,
      count: (0, _lo.get)(response, 'data.count')
    };
    dispatch({
      type: LOAD_USER_HISTORY,
      payload
    });
  }).catch(error => {
    dispatch({
      type: LOAD_USER_HISTORY,
      payload: error,
      error: true
    });
  });
};
/**
 * Load the list of the role
 * @param employee the name of the employee of
 */


exports.loadUserChangelog = loadUserChangelog;

const loadUserRole = employee => (dispatch, getState) => {
  dispatch({
    type: LOAD_ROLE_STARTED,
    payload: (0, _Immutable.default)({})
  });
  return _HttpFetch.default.getResource(`api/rpc?proc_name=org_type_roles&employeeof=${employee}&search_params=`).then(response => {
    dispatch({
      type: LOAD_ROLE_OF,
      payload: {
        employee,
        data: (response || {}).data
      }
    });
    return response;
  }).catch(error => {
    dispatch({
      type: LOAD_ROLE_OF,
      payload: error,
      error: true
    });
  });
};
/**
 * Creates a user.
 * @param user the user to create.
 */


exports.loadUserRole = loadUserRole;

const createUser = record => (dispatch, getState) => (0, _actionUtils.mutateData)(CREATE_USER_STARTED, CREATE_USER, _saveUserMutation.default, 'User created.')({
  record
})(dispatch, getState).then(data => {
  if (data instanceof Error === false) {
    _History.default.push(`/user-management/${data.user_login_id}`);
  }

  return data;
});
/**
 * Updates a user.
 * @param user the user to edit.
 */


exports.createUser = createUser;

const updateUser = record => (0, _actionUtils.mutateData)(UPDATE_USER_STARTED, UPDATE_USER, _saveUserMutation.default, 'User updated.')({
  record
});

exports.updateUser = updateUser;