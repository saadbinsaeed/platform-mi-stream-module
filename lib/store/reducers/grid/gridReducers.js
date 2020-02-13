"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _classificationsDropDownReducer = _interopRequireDefault(require("store/reducers/grid/dropdowns/classifications/classificationsDropDownReducer"));

var _groupsDropDownReducer = _interopRequireDefault(require("store/reducers/grid/dropdowns/groups/groupsDropDownReducer"));

var _organisationsDropDownReducer = _interopRequireDefault(require("store/reducers/grid/dropdowns/organisations/organisationsDropDownReducer"));

var _gridStateReducer = _interopRequireDefault(require("store/reducers/grid/state/gridStateReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dropdowns = (0, _redux.combineReducers)({
  classifications: _classificationsDropDownReducer.default,
  groups: _groupsDropDownReducer.default,
  organisations: _organisationsDropDownReducer.default
});

var _default = (0, _redux.combineReducers)({
  dropdowns,
  state: _gridStateReducer.default
});

exports.default = _default;