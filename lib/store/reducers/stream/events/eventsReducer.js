"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _eventsActions = require("store/actions/stream/eventsActions");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _eventProcessesReducer = _interopRequireDefault(require("./processes/eventProcessesReducer"));

var _eventReducer = _interopRequireDefault(require("./event/eventReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  event: _eventReducer.default,
  processes: _eventProcessesReducer.default,
  list: (0, _reducerUtils.dataTableReducer)(_eventsActions.LOAD_EVENTS_STARTED, _eventsActions.LOAD_EVENTS)
});

exports.default = _default;