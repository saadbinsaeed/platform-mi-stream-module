"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _adminReducer = _interopRequireDefault(require("./admin/adminReducer"));

var _appReducer = _interopRequireDefault(require("./app/appReducer"));

var _routerHistoryReducer = _interopRequireDefault(require("./routing/routerHistoryReducer"));

var _userReducer = _interopRequireDefault(require("./user/userReducer"));

var _broadcastReducer = _interopRequireDefault(require("./broadcasts/broadcastReducer"));

var _messengerReducer = _interopRequireDefault(require("./messenger/messengerReducer"));

var _commonReducer = _interopRequireDefault(require("./common/commonReducer"));

var _streamReducer = _interopRequireDefault(require("./stream/streamReducer"));

var _globalReducer = _interopRequireDefault(require("./global/globalReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Each folder in this directory structure /reducers represents a slice
 * of the application state. Navigating this directory structure should be
 * the equivalent of navigating the app state.
 */
const rootReducer = (0, _redux.combineReducers)({
  admin: _adminReducer.default,
  app: _appReducer.default,
  user: _userReducer.default,
  chat: _messengerReducer.default,
  broadcasts: _broadcastReducer.default,
  common: _commonReducer.default,
  routing: _routerHistoryReducer.default,
  stream: _streamReducer.default,
  global: _globalReducer.default
});
var _default = rootReducer;
exports.default = _default;