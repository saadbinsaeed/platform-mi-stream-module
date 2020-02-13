"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _classificationsActions = require("store/actions/classifications/classificationsActions");

var _default = (0, _redux.combineReducers)({
  details: (0, _reducerUtils.loadDataReducer)(_classificationsActions.LOAD_CLASSIFICATION_STARTED, _classificationsActions.LOAD_CLASSIFICATION),
  update: (0, _reducerUtils.loadDataReducer)(_classificationsActions.UPDATE_CLASSIFICATION_STARTED, _classificationsActions.UPDATE_CLASSIFICATION),
  list: (0, _reducerUtils.dataTableReducer)(_classificationsActions.LOAD_CLASSIFICATIONS_STARTED, _classificationsActions.LOAD_CLASSIFICATIONS),
  entities: (0, _reducerUtils.dataTableReducer)(_classificationsActions.LOAD_CLASSIFICATION_ENTITIES_STARTED, _classificationsActions.LOAD_CLASSIFICATION_ENTITIES),
  addedClassification: (0, _reducerUtils.loadDataReducer)(_classificationsActions.CREATE_CLASSIFICATION_STARTED, _classificationsActions.CREATE_CLASSIFICATION)
});

exports.default = _default;