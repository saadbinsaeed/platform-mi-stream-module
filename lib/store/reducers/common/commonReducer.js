"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _autocompleteReducer = _interopRequireDefault(require("./autocomplete/autocompleteReducer"));

var _calendarReducer = _interopRequireDefault(require("./calendar/calendarReducer"));

var _multiselectReducer = _interopRequireDefault(require("./multiselect/multiselectReducer"));

var _selectReducer = _interopRequireDefault(require("./select/selectReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  autocomplete: _autocompleteReducer.default,
  calendar: _calendarReducer.default,
  multiselect: _multiselectReducer.default,
  select: _selectReducer.default
});

exports.default = _default;