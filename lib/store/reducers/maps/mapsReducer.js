"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _situationalAwarenessReducer = _interopRequireDefault(require("./situationalAwareness/situationalAwarenessReducer"));

var _situationalAwarenessDetailReducer = _interopRequireDefault(require("./situationalAwarenessDetail/situationalAwarenessDetailReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Tasks
var _default = (0, _redux.combineReducers)({
  situationalAwareness: _situationalAwarenessReducer.default,
  situationalAwarenessDetail: _situationalAwarenessDetailReducer.default
});

exports.default = _default;