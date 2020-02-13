"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _organisationsActions = require("store/actions/entities/organisationsActions");

var _utils = require("app/utils/utils");

var _default = (0, _redux.combineReducers)({
  details: (0, _reducerUtils.loadDataReducer)(_organisationsActions.LOAD_ORGANISATION_STARTED, _organisationsActions.LOAD_ORGANISATION, ({
    state,
    meta
  }) => (0, _utils.getStr)(state, 'data.organisation.id') === (0, _utils.getStr)(meta, 'id')),
  save: (0, _reducerUtils.loadDataReducer)(_organisationsActions.SAVE_ORGANISATION_STARTED, _organisationsActions.SAVE_ORGANISATION),
  list: (0, _reducerUtils.dataTableReducer)(_organisationsActions.LOAD_ORGANISATIONS_STARTED, _organisationsActions.LOAD_ORGANISATIONS),
  children: (0, _reducerUtils.loadDataReducer)(_organisationsActions.LOAD_ORGANISATION_CHILDREN_STARTED, _organisationsActions.LOAD_ORGANISATION_CHILDREN)
});

exports.default = _default;