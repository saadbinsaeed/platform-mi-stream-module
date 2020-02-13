"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _designerActions = require("store/actions/designer/designerActions");

var _default = (0, _redux.combineReducers)({
  forms: (0, _reducerUtils.dataTableReducer)(_designerActions.LOAD_FORMS_DEFINITIONS_STARTED, _designerActions.LOAD_FORMS_DEFINITIONS, () => true),
  form: (0, _reducerUtils.loadDataReducer)(_designerActions.LOAD_FORM_DEFINITION_STARTED, _designerActions.LOAD_FORM_DEFINITION)
});

exports.default = _default;