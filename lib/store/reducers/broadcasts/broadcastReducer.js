"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _broadcastsActions = require("store/actions/broadcasts/broadcastsActions");

var _activeBroadcastsReducer = _interopRequireDefault(require("./active/activeBroadcastsReducer"));

var _broadcastMembersReducer = _interopRequireDefault(require("./members/broadcastMembersReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  active: _activeBroadcastsReducer.default,
  calendar: (0, _reducerUtils.loadDataReducer)(_broadcastsActions.GET_BROADCASTS_CALENDAR_STARTED, _broadcastsActions.GET_BROADCASTS_CALENDAR),
  detail: (0, _reducerUtils.loadDataReducer)(_broadcastsActions.GET_BROADCAST_STARTED, _broadcastsActions.GET_BROADCAST),
  list: (0, _reducerUtils.dataTableReducer)(_broadcastsActions.GET_BROADCASTS_STARTED, _broadcastsActions.GET_BROADCASTS),
  members: _broadcastMembersReducer.default,
  save: (0, _reducerUtils.loadDataReducer)(_broadcastsActions.SAVE_BROADCAST_STARTED, _broadcastsActions.SAVE_BROADCAST)
});

exports.default = _default;