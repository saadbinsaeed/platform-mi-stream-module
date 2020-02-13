"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _processActions = require("store/actions/abox/processActions");

var _processTasksReducer = _interopRequireDefault(require("./tasks/processTasksReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const processReducer = (0, _redux.combineReducers)({
  changelog: (0, _reducerUtils.loadDataReducer)(_processActions.LOAD_PROCESS_CHANGELOG_STARTED, _processActions.LOAD_PROCESS_CHANGELOG, _reducerUtils.truthful),
  children: (0, _reducerUtils.loadDataReducer)(_processActions.LOAD_SUBPROCESSES_STARTED, _processActions.LOAD_SUBPROCESSES),
  details: (0, _reducerUtils.loadDataReducer)(_processActions.LOAD_PROCESS_DETAILS_STARTED, _processActions.LOAD_PROCESS_DETAILS, _reducerUtils.compareId),
  detailsOutdated: (state = false, {
    type,
    payload
  }) => type === _processActions.OUTDATE_PROCESS_DETAILS ? payload : state,
  started: (0, _reducerUtils.loadDataReducer)(_processActions.LOAD_STARTED_PROCESS_DETAILS_STARTED, _processActions.LOAD_STARTED_PROCESS_DETAILS),
  addTeamMembers: (0, _reducerUtils.loadDataReducer)(_processActions.ADD_TEAM_MEMBER_STARTED, _processActions.ADD_TEAM_MEMBER),
  tasks: _processTasksReducer.default
});
var _default = processReducer;
exports.default = _default;