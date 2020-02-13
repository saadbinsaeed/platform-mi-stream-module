"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _eventsActions = require("store/actions/stream/eventsActions");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _default = (0, _redux.combineReducers)({
  description: (0, _reducerUtils.loadDataReducer)(_eventsActions.LOAD_TRANSLATION_RULE_STARTED, _eventsActions.LOAD_TRANSLATION_RULE)
});

exports.default = _default;