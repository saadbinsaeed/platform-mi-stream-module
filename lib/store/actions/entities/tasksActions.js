"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTasksAutocomplete = exports.LOAD_TASKS_AUTOCOMPLETE = exports.LOAD_TASKS_AUTOCOMPLETE_STARTED = void 0;

var _actionUtils = require("app/utils/redux/action-utils");

var _tasksAutocompleteQuery = _interopRequireDefault(require("graphql/entities/tasks/tasksAutocompleteQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_TASKS_AUTOCOMPLETE_STARTED = '@@affectli/entities/tasks/LOAD_TASKS_AUTOCOMPLETE_STARTED';
exports.LOAD_TASKS_AUTOCOMPLETE_STARTED = LOAD_TASKS_AUTOCOMPLETE_STARTED;
const LOAD_TASKS_AUTOCOMPLETE = '@@affectli/entities/tasks/LOAD_TASKS_AUTOCOMPLETE';
exports.LOAD_TASKS_AUTOCOMPLETE = LOAD_TASKS_AUTOCOMPLETE;
const loadTasksAutocomplete = (0, _actionUtils.loadData)(LOAD_TASKS_AUTOCOMPLETE_STARTED, LOAD_TASKS_AUTOCOMPLETE, _tasksAutocompleteQuery.default);
exports.loadTasksAutocomplete = loadTasksAutocomplete;