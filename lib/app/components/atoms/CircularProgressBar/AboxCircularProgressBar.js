"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _aboxConfig = require("app/config/aboxConfig");

var _CircularProgressBar = _interopRequireDefault(require("./CircularProgressBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AboxCircularProgressBar = (0, _styledComponents.withTheme)(props => {
  const {
    theme,
    priority,
    disabled
  } = props;
  const color = disabled ? theme.priorityColors['disabled'] : theme.priorityColors[(0, _aboxConfig.getPriorityColor)(priority)];
  return _react.default.createElement(_CircularProgressBar.default, _extends({}, props, {
    color: color
  }));
});
var _default = AboxCircularProgressBar;
exports.default = _default;