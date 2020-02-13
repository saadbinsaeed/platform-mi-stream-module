"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _dashboardActions = require("store/actions/dashboard/dashboardActions");

var _default = (0, _redux.combineReducers)({
  tasksAssigned: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_TASKS_ASSIGNED_STARTED, _dashboardActions.LOAD_TASKS_ASSIGNED, () => true),
  tasksOwned: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_TASKS_OWNED_STARTED, _dashboardActions.LOAD_TASKS_OWNED, () => true),
  tasksMemberOf: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_TASKS_FOLLOWING_STARTED, _dashboardActions.LOAD_TASKS_FOLLOWING, () => true),
  tasksDone: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_TASKS_DONE_STARTED, _dashboardActions.LOAD_TASKS_DONE, () => true),
  processesAssigned: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_PROCESSES_ASSIGNED_STARTED, _dashboardActions.LOAD_PROCESSES_ASSIGNED, () => true),
  processesOwned: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_PROCESSES_OWNED_STARTED, _dashboardActions.LOAD_PROCESSES_OWNED, () => true),
  processesMemberOf: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_PROCESSES_FOLLOWING_STARTED, _dashboardActions.LOAD_PROCESSES_FOLLOWING, () => true),
  processesDone: (0, _reducerUtils.dataTableReducer)(_dashboardActions.LOAD_PROCESSES_DONE_STARTED, _dashboardActions.LOAD_PROCESSES_DONE, () => true)
});

exports.default = _default;