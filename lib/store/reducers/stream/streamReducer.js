"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _eventsReducer = _interopRequireDefault(require("./events/eventsReducer"));

var _translationRuleReducer = _interopRequireDefault(require("./translationRuleReducer"));

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _eventsActions = require("store/actions/stream/eventsActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  events: _eventsReducer.default,
  vtr: (0, _reducerUtils.loadDataReducer)(_eventsActions.LOAD_VTR_STARTED, _eventsActions.LOAD_VTR),
  translationRule: _translationRuleReducer.default
});

exports.default = _default;