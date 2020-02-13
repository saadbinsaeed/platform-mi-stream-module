"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _taskActions = require("store/actions/abox/taskActions");

const taskReducer = (0, _redux.combineReducers)({
  timeline: (0, _reducerUtils.dataTableReducer)(_taskActions.LOAD_TIMELINE_TASKS_STARTED, _taskActions.LOAD_TIMELINE_TASKS, () => true),
  calendar: (0, _reducerUtils.dataTableReducer)(_taskActions.LOAD_CALENDAR_TASKS_STARTED, _taskActions.LOAD_CALENDAR_TASKS, () => true),
  changelog: (0, _reducerUtils.loadDataReducer)(_taskActions.LOAD_TASK_CHANGELOG_STARTED, _taskActions.LOAD_TASK_CHANGELOG, _reducerUtils.truthful),
  details: (0, _reducerUtils.loadDataReducer)(_taskActions.LOAD_TASK_DETAILS_STARTED, _taskActions.LOAD_TASK_DETAILS, _reducerUtils.compareId),
  detailsOutdated: (state = false, {
    type,
    payload
  }) => type === _taskActions.OUTDATE_TASK_DETAILS ? payload : state,
  list: (0, _reducerUtils.dataTableReducer)(_taskActions.LOAD_TASKS_STARTED, _taskActions.LOAD_TASKS, () => true),
  subtasks: (0, _reducerUtils.dataTableReducer)(_taskActions.LOAD_SUBTASKS_STARTED, _taskActions.LOAD_SUBTASKS, () => true),
  addTeamMembers: (0, _reducerUtils.loadDataReducer)(_taskActions.ADD_TEAM_MEMBER_STARTED, _taskActions.ADD_TEAM_MEMBER)
});
var _default = taskReducer;
exports.default = _default;