"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _groupsActions = require("store/actions/admin/groupsActions");

var _groupReducer = _interopRequireDefault(require("./group/groupReducer"));

var _groupListReducer = _interopRequireDefault(require("./list/groupListReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  group: _groupReducer.default,
  list: _groupListReducer.default,
  save: (0, _reducerUtils.loadDataReducer)(_groupsActions.CREATE_GROUP_STARTED, _groupsActions.CREATE_GROUP),
  users: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_USERS_STARTED, _groupsActions.LOAD_GROUP_USERS),
  addUsersList: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_USERS_ADD_LIST_STARTED, _groupsActions.LOAD_GROUP_USERS_ADD_LIST),
  addGroupUser: (0, _reducerUtils.loadDataReducer)(_groupsActions.ADD_GROUP_USERS_STARTED, _groupsActions.ADD_GROUP_USERS),
  things: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_THINGS_STARTED, _groupsActions.LOAD_GROUP_THINGS),
  people: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_PEOPLE_STARTED, _groupsActions.LOAD_GROUP_PEOPLE),
  organisations: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_ORGANISATION_STARTED, _groupsActions.LOAD_GROUP_ORGANISATION),
  customEntities: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_CUSTOM_STARTED, _groupsActions.LOAD_GROUP_CUSTOM),
  processDefinitions: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_PROCESS_DEFINITIONS_STARTED, _groupsActions.LOAD_GROUP_PROCESS_DEFINITIONS),
  addEntitiesList: (0, _reducerUtils.dataTableReducer)(_groupsActions.LOAD_GROUP_ENTITIES_STARTED, _groupsActions.LOAD_GROUP_ENTITIES),
  addingEntities: (0, _reducerUtils.loadDataReducer)(_groupsActions.ADD_ENTITIES_TO_GROUP_STARTED, _groupsActions.ADD_ENTITIES_TO_GROUP),
  changelog: (0, _reducerUtils.loadDataReducer)(_groupsActions.LOAD_GROUP_CHANGELOG_STARTED, _groupsActions.LOAD_GROUP_CHANGELOG, _reducerUtils.truthful)
});

exports.default = _default;