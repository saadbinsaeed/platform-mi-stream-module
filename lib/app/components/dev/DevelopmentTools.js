"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reduxDevtools = require("redux-devtools");

var _reduxDevtoolsLogMonitor = _interopRequireDefault(require("redux-devtools-log-monitor"));

var _reduxDevtoolsDockMonitor = _interopRequireDefault(require("redux-devtools-dock-monitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the redux development tool
 */
// Monitors are separate packages, and you can make a custom one
const DevTools = (0, _reduxDevtools.createDevTools)( // Monitors are individually adjustable with props.
// Consult their repositories to learn about those props.
// Here, we put LogMonitor inside a DockMonitor.
// Note: DockMonitor is visible by default.
_react.default.createElement(_reduxDevtoolsDockMonitor.default, {
  toggleVisibilityKey: "ctrl-h",
  changePositionKey: "ctrl-q",
  defaultIsVisible: false
}, _react.default.createElement(_reduxDevtoolsLogMonitor.default, {
  theme: "tomorrow"
})));
var _default = DevTools;
exports.default = _default;