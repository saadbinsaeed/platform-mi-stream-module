"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeEntityChildrenDrawer = exports.openEntityChildrenDrawer = exports.toggleEntityChildrenDrawer = exports.loadEntityChildrenDrawer = exports.LOAD_ENTITY_CHILDREN_DRAWER_CURRENT_ID = exports.TOGGLE_ENTITY_CHILDREN_DRAWER = exports.LOAD_ENTITY_CHILDREN_DRAWER = exports.LOAD_ENTITY_CHILDREN_DRAWER_START = void 0;

var _actionUtils = require("app/utils/redux/action-utils");

var _entityChildrenDrawerQuery = _interopRequireDefault(require("graphql/entities/common/childrenDrawer/entityChildrenDrawerQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOAD_ENTITY_CHILDREN_DRAWER_START = '@@affectli/entityChildrenDrawer/LOAD_ENTITY_CHILDREN_DRAWER_START';
exports.LOAD_ENTITY_CHILDREN_DRAWER_START = LOAD_ENTITY_CHILDREN_DRAWER_START;
const LOAD_ENTITY_CHILDREN_DRAWER = '@@affectli/entityChildrenDrawer/LOAD_ENTITY_CHILDREN_DRAWER';
exports.LOAD_ENTITY_CHILDREN_DRAWER = LOAD_ENTITY_CHILDREN_DRAWER;
const TOGGLE_ENTITY_CHILDREN_DRAWER = '@@affectli/entityChildrenDrawer/TOGGLE_ENTITY_CHILDREN_DRAWER';
exports.TOGGLE_ENTITY_CHILDREN_DRAWER = TOGGLE_ENTITY_CHILDREN_DRAWER;
const LOAD_ENTITY_CHILDREN_DRAWER_CURRENT_ID = '@@affectli/entityChildrenDrawer/LOAD_ENTITY_CHILDREN_DRAWER_CURRENT_ID';
exports.LOAD_ENTITY_CHILDREN_DRAWER_CURRENT_ID = LOAD_ENTITY_CHILDREN_DRAWER_CURRENT_ID;

const loadEntityChildrenDrawer = id => (dispatch, getState) => {
  dispatch({
    type: LOAD_ENTITY_CHILDREN_DRAWER_CURRENT_ID,
    payload: id
  });

  if (id === null) {
    dispatch({
      type: LOAD_ENTITY_CHILDREN_DRAWER_START
    });
    dispatch({
      type: LOAD_ENTITY_CHILDREN_DRAWER,
      payload: null
    });
    return Promise.resolve(null);
  }

  const queryOptions = {
    id,
    filterBy: [{
      field: 'parent.id',
      op: '=',
      value: id
    }]
  };
  return (0, _actionUtils.loadData)(LOAD_ENTITY_CHILDREN_DRAWER_START, LOAD_ENTITY_CHILDREN_DRAWER, _entityChildrenDrawerQuery.default)(queryOptions)(dispatch, getState);
};

exports.loadEntityChildrenDrawer = loadEntityChildrenDrawer;

const toggleEntityChildrenDrawer = open => (dispatch, getState) => {
  const isOpen = open !== undefined ? open : !getState().entityChildrenDrawer.isOpen;
  return dispatch({
    type: TOGGLE_ENTITY_CHILDREN_DRAWER,
    payload: isOpen
  });
};

exports.toggleEntityChildrenDrawer = toggleEntityChildrenDrawer;
const openEntityChildrenDrawer = toggleEntityChildrenDrawer.bind(null, true);
exports.openEntityChildrenDrawer = openEntityChildrenDrawer;
const closeEntityChildrenDrawer = toggleEntityChildrenDrawer.bind(null, false);
exports.closeEntityChildrenDrawer = closeEntityChildrenDrawer;