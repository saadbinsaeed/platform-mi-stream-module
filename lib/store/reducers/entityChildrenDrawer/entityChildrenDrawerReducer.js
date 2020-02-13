"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _entityChildrenDrawerActions = require("store/actions/entityChildrenDrawer/entityChildrenDrawerActions");

const DEFAULT_STATE = {
  isLoading: false,
  isOpen: false,
  data: {},
  currentId: null
};

var _default = (state = DEFAULT_STATE, action) => {
  const {
    type,
    payload
  } = action || {};

  switch (type) {
    case _entityChildrenDrawerActions.LOAD_ENTITY_CHILDREN_DRAWER_START:
    case _entityChildrenDrawerActions.LOAD_ENTITY_CHILDREN_DRAWER:
      return (0, _reducerUtils.loadDataReducer)(_entityChildrenDrawerActions.LOAD_ENTITY_CHILDREN_DRAWER_START, _entityChildrenDrawerActions.LOAD_ENTITY_CHILDREN_DRAWER)(state, action);

    case _entityChildrenDrawerActions.TOGGLE_ENTITY_CHILDREN_DRAWER:
      return { ...state,
        isOpen: !!payload
      };

    case _entityChildrenDrawerActions.LOAD_ENTITY_CHILDREN_DRAWER_CURRENT_ID:
      return { ...state,
        currentId: payload
      };

    default:
      return state;
  }
};

exports.default = _default;