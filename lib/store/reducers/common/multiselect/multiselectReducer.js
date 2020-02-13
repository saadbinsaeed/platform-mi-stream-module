"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _multiselectActions = require("store/actions/common/multiselectActions");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _default = (0, _redux.combineReducers)({
  gateway: (0, _reducerUtils.loadDataReducer)(_multiselectActions.LOAD_GATEWAYS_STARTED, _multiselectActions.LOAD_GATEWAYS),
  tenant: (0, _reducerUtils.loadDataReducer)(_multiselectActions.LOAD_TENANTS_STARTED, _multiselectActions.LOAD_TENANTS),
  vendor: (0, _reducerUtils.loadDataReducer)(_multiselectActions.LOAD_VENDORS_STARTED, _multiselectActions.LOAD_VENDORS),
  region: (0, _reducerUtils.loadDataReducer)(_multiselectActions.LOAD_REGIONS_STARTED, _multiselectActions.LOAD_REGIONS)
});

exports.default = _default;