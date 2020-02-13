"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _customEntitiesActions = require("store/actions/entities/customEntitiesActions");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _utils = require("app/utils/utils");

var _default = (0, _redux.combineReducers)({
  details: (0, _reducerUtils.loadDataReducer)(_customEntitiesActions.LOAD_CUSTOM_ENTITY_DETAILS_STARTED, _customEntitiesActions.LOAD_CUSTOM_ENTITY_DETAILS, ({
    state,
    meta
  }) => (0, _utils.getStr)(state, 'data.customEntity.id') === (0, _utils.getStr)(meta, 'id')),
  children: (0, _reducerUtils.loadDataReducer)(_customEntitiesActions.LOAD_CUSTOM_ENTITY_CHILDREN_STARTED, _customEntitiesActions.LOAD_CUSTOM_ENTITY_CHILDREN),
  list: (0, _reducerUtils.dataTableReducer)(_customEntitiesActions.LOAD_CUSTOM_ENTITIES_LIST_STARTED, _customEntitiesActions.LOAD_CUSTOM_ENTITIES_LIST),
  save: (0, _reducerUtils.loadDataReducer)(_customEntitiesActions.CUSTOM_ENTITY_SAVE_STARTED, _customEntitiesActions.CUSTOM_ENTITY_SAVE)
});

exports.default = _default;