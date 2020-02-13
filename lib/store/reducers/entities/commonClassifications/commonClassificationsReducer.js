"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _entityAttributesActions = require("store/actions/entities/common/entityAttributesActions");

const commonClassificationsReducer = (0, _redux.combineReducers)({
  classifications: (0, _reducerUtils.loadDataReducer)(_entityAttributesActions.LOAD_ENTITY_CLASSES_AND_ATTRIBUTES_STARTED, _entityAttributesActions.LOAD_ENTITY_CLASSES_AND_ATTRIBUTES),
  attributes: (0, _reducerUtils.loadDataReducer)(_entityAttributesActions.UPDATE_ENTITY_ATTRIBUTES_STARTED, _entityAttributesActions.UPDATE_ENTITY_ATTRIBUTES)
});
var _default = commonClassificationsReducer;
exports.default = _default;