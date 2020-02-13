"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _groupsReducer = _interopRequireDefault(require("./groups/groupsReducer"));

var _usersReducer = _interopRequireDefault(require("./users/usersReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  groups: _groupsReducer.default,
  users: _usersReducer.default
});

exports.default = _default;