"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _appListReducer = _interopRequireDefault(require("./list/appListReducer"));

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _myAppsActions = require("store/actions/abox/myAppsActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appReducer = (0, _redux.combineReducers)({
  list: _appListReducer.default,
  typeaheadProcessDefinitions: (0, _reducerUtils.loadDataReducer)(_myAppsActions.LOAD_TYPEAHEAD_PROCESS_DEFINITIONS_STARTED, _myAppsActions.LOAD_TYPEAHEAD_PROCESS_DEFINITIONS)
});
var _default = appReducer;
exports.default = _default;