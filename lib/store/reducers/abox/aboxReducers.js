"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _aboxActions = require("store/actions/abox/aboxActions");

var _processActions = require("store/actions/abox/processActions");

var _myAppsActions = require("store/actions/abox/myAppsActions");

var _aboxExpandedProcessReducer = _interopRequireDefault(require("./expanded/aboxExpandedProcessReducer"));

var _processReducer = _interopRequireDefault(require("./process/processReducer"));

var _appReducer = _interopRequireDefault(require("./app/appReducer"));

var _taskReducer = _interopRequireDefault(require("./task/taskReducer"));

var _timelineReducer = _interopRequireDefault(require("./timeline/timelineReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const aboxReducer = (0, _redux.combineReducers)({
  app: _appReducer.default,
  list: (0, _reducerUtils.dataTableReducer)(_processActions.LOAD_PROCESSES_STARTED, _processActions.LOAD_PROCESSES),
  processesCards: (0, _reducerUtils.dataTableReducer)(_processActions.LOAD_PROCESSES_CARDS_STARTED, _processActions.LOAD_PROCESSES_CARDS, () => true),
  attachments: (0, _reducerUtils.dataTableReducer)(_aboxActions.LOAD_ABOX_ATTACHMENTS_STARTED, _aboxActions.LOAD_ABOX_ATTACHMENTS, () => true),
  attachmentsOutdated: (state = false, {
    type,
    payload
  }) => type === _aboxActions.OUTDATE_ABOX_ATTACHMENTS ? payload : state,
  relationships: (0, _reducerUtils.dataTableReducer)(_aboxActions.GET_ABOX_RELATIONSHIPS_STARTED, _aboxActions.GET_ABOX_RELATIONSHIPS, () => true),
  processDefinition: (0, _reducerUtils.loadDataReducer)(_myAppsActions.LOAD_ABOX_PROCESS_DEFINITION_STARTED, _myAppsActions.LOAD_ABOX_PROCESS_DEFINITION),
  expanded: _aboxExpandedProcessReducer.default,
  process: _processReducer.default,
  task: _taskReducer.default,
  timeline: _timelineReducer.default
});
var _default = aboxReducer;
exports.default = _default;