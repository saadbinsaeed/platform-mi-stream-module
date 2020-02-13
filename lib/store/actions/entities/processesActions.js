"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadProcessesAutocomplete = exports.LOAD_PROCESSES_AUTOCOMPLETE = exports.LOAD_PROCESSES_AUTOCOMPLETE_STARTED = void 0;

var _actionUtils = require("app/utils/redux/action-utils");

var _processesAutocompleteQuery = _interopRequireDefault(require("graphql/entities/processes/processesAutocompleteQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_PROCESSES_AUTOCOMPLETE_STARTED = '@@affectli/entities/processes/LOAD_PROCESSES_AUTOCOMPLETE_STARTED';
exports.LOAD_PROCESSES_AUTOCOMPLETE_STARTED = LOAD_PROCESSES_AUTOCOMPLETE_STARTED;
const LOAD_PROCESSES_AUTOCOMPLETE = '@@affectli/entities/processes/LOAD_PROCESSES_AUTOCOMPLETE';
exports.LOAD_PROCESSES_AUTOCOMPLETE = LOAD_PROCESSES_AUTOCOMPLETE;
const loadProcessesAutocomplete = (0, _actionUtils.loadData)(LOAD_PROCESSES_AUTOCOMPLETE_STARTED, LOAD_PROCESSES_AUTOCOMPLETE, _processesAutocompleteQuery.default);
exports.loadProcessesAutocomplete = loadProcessesAutocomplete;