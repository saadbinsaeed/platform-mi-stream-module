"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerUtils = require("app/utils/redux/reducer-utils");

var _userManagementAction = require("store/actions/admin/userManagementAction");

var _userReducer = _interopRequireDefault(require("./user/userReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  user: _userReducer.default,
  details: (0, _reducerUtils.loadDataReducer)(_userManagementAction.LOAD_USER_STARTED, _userManagementAction.LOAD_USER, _reducerUtils.compareId),
  changelog: (0, _reducerUtils.loadDataReducer)(_userManagementAction.LOAD_USER_HISTORY_STARTED, _userManagementAction.LOAD_USER_HISTORY, _reducerUtils.compareId),
  userlist: (0, _reducerUtils.dataTableReducer)(_userManagementAction.LOAD_USERS_MANAGEMENT_STARTED, _userManagementAction.LOAD_USERS_MANAGEMENT)
});

exports.default = _default;