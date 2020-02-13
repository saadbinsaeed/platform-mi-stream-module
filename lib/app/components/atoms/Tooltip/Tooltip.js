"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TooltipStyled = _styledComponents.default.div.withConfig({
  displayName: "Tooltip__TooltipStyled",
  componentId: "dyumd2-0"
})(["position:relative;[alt]::after{content:attr(alt);position:absolute;transform:translateX(", "%) translateY(", "%);background:rgba(25,25,25,0.85);;text-align:center;color:#fff;padding:4px 2px;font-size:12px;border-radius:5px;pointer-events:none;padding:4px 4px;z-index:99;opacity:0;margin-left:-10px;}[alt]:hover::after,[alt]:hover::before{opacity:1}"], ({
  x
}) => x || x === 0 ? x : -50, ({
  y
}) => y || y === 0 ? y : -100);

const Tooltip = (0, _recompose.pure)(({
  children,
  x,
  y,
  ...restProps
}) => {
  return _react.default.createElement(TooltipStyled, _extends({
    x: x,
    y: y
  }, restProps), children);
});
var _default = Tooltip;
exports.default = _default;