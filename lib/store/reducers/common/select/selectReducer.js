"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _usersActions = require("store/actions/admin/usersActions");

var _default = (0, _redux.combineReducers)({
  user: (0, _reducerUtils.loadDataReducer)(_usersActions.LOAD_USER_SELECT_STARTED, _usersActions.LOAD_USER_SELECT)
});

exports.default = _default;