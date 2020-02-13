"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _thingsActions = require("store/actions/entities/thingsActions");

var _utils = require("app/utils/utils");

var _default = (0, _redux.combineReducers)({
  details: (0, _reducerUtils.loadDataReducer)(_thingsActions.LOAD_THING_STARTED, _thingsActions.LOAD_THING, ({
    state,
    meta
  }) => (0, _utils.getStr)(state, 'data.thing.id') === (0, _utils.getStr)(meta, 'id')),
  list: (0, _reducerUtils.dataTableReducer)(_thingsActions.LOAD_THINGS_GRID_STARTED, _thingsActions.LOAD_THINGS_GRID),
  children: (0, _reducerUtils.loadDataReducer)(_thingsActions.LOAD_CHILDREN_STARTED, _thingsActions.LOAD_CHILDREN),
  save: (0, _reducerUtils.loadDataReducer)(_thingsActions.THING_SAVE_STARTED, _thingsActions.THING_SAVE)
});

exports.default = _default;