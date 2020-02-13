"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _groupsActions = require("store/actions/admin/groupsActions");

var _usersActions = require("store/actions/admin/usersActions");

var _peopleActions = require("store/actions/entities/peopleActions");

var _organisationsActions = require("store/actions/entities/organisationsActions");

var _thingsActions = require("store/actions/entities/thingsActions");

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

var _relationshipsActions = require("store/actions/entities/relationshipsActions");

var _processesActions = require("store/actions/entities/processesActions");

var _taskActions = require("store/actions/abox/taskActions");

var _tasksActions = require("store/actions/entities/tasksActions");

var _DirectoriesActions = require("store/actions/common/DirectoriesActions");

var _default = (0, _redux.combineReducers)({
  classification: (0, _reducerUtils.loadDataReducer)(_classificationsActions.LOAD_CLASSIFICATION_AUTOCOMPLETE_STARTED, _classificationsActions.LOAD_CLASSIFICATION_AUTOCOMPLETE, () => true),
  group: (0, _reducerUtils.loadDataReducer)(_groupsActions.LOAD_GROUP_AUTOCOMPLETE_STARTED, _groupsActions.LOAD_GROUP_AUTOCOMPLETE, () => true),
  user: (0, _reducerUtils.loadDataReducer)(_usersActions.LOAD_USER_AUTOCOMPLETE_STARTED, _usersActions.LOAD_USER_AUTOCOMPLETE, () => true),
  person: (0, _reducerUtils.loadDataReducer)(_peopleActions.LOAD_PERSON_AUTOCOMPLETE_STARTED, _peopleActions.LOAD_PERSON_AUTOCOMPLETE),
  organisation: (0, _reducerUtils.loadDataReducer)(_organisationsActions.LOAD_ORGANISATION_AUTOCOMPLETE_STARTED, _organisationsActions.LOAD_ORGANISATION_AUTOCOMPLETE, () => true),
  thing: (0, _reducerUtils.loadDataReducer)(_thingsActions.LOAD_THING_AUTOCOMPLETE_STARTED, _thingsActions.LOAD_THING_AUTOCOMPLETE, () => true),
  customEntities: (0, _reducerUtils.loadDataReducer)(_customEntitiesActions.LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE_STARTED, _customEntitiesActions.LOAD_CUSTOM_ENTITIES_AUTOCOMPLETE, () => true),
  relationDefinition: (0, _reducerUtils.loadDataReducer)(_relationshipsActions.LOAD_RELATION_DEFINITION_AUTOCOMPLETE_STARTED, _relationshipsActions.LOAD_RELATION_DEFINITION_AUTOCOMPLETE, () => true),
  processes: (0, _reducerUtils.loadDataReducer)(_processesActions.LOAD_PROCESSES_AUTOCOMPLETE_STARTED, _processesActions.LOAD_PROCESSES_AUTOCOMPLETE, () => true),
  taskCandidates: (0, _reducerUtils.loadDataReducer)(_taskActions.LOAD_TASK_CANDIDATE_AUTOCOMPLETE_STARTED, _taskActions.LOAD_TASK_CANDIDATE_AUTOCOMPLETE, () => true),
  taskMembers: (0, _reducerUtils.loadDataReducer)(_taskActions.LOAD_TASK_MEMBER_AUTOCOMPLETE_STARTED, _taskActions.LOAD_TASK_MEMBER_AUTOCOMPLETE, () => true),
  tasks: (0, _reducerUtils.loadDataReducer)(_tasksActions.LOAD_TASKS_AUTOCOMPLETE_STARTED, _tasksActions.LOAD_TASKS_AUTOCOMPLETE, () => true),
  directories: (0, _reducerUtils.loadDataReducer)(_DirectoriesActions.LOAD_DIRECTORIES_AUTOCOMPLETE_STARTED, _DirectoriesActions.LOAD_DIRECTORIES_AUTOCOMPLETE, () => true)
});

exports.default = _default;