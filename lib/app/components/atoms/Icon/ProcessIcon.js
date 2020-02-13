"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _aboxConfig = require("app/config/aboxConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ProcessIconStyled = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "ProcessIcon__ProcessIconStyled",
  componentId: "sc-1qs58wy-0"
})(["border-radius:500rem;padding:0.125rem 0.5rem;", " ", ""], ({
  noMargin
}) => noMargin ? '' : 'margin-right: 1rem !important;', ({
  backgroundColor,
  theme
}) => `background-color: ${theme.priorityColors[backgroundColor]};`);

const ProcessIcon = ({
  name,
  priority,
  disabled,
  ...rest
}) => {
  const priorityColor = disabled ? 'disabled' : (0, _aboxConfig.getPriorityColor)(priority);
  return _react.default.createElement(ProcessIconStyled, _extends({}, rest, {
    name: name,
    backgroundColor: priorityColor
  }));
};

var _default = (0, _recompose.pure)(ProcessIcon);

exports.default = _default;