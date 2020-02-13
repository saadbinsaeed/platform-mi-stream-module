"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Countdown = _interopRequireDefault(require("app/components/atoms/Countdown/Countdown"));

var _ButtonProps = _interopRequireDefault(require("app/components/atoms/Button/ButtonProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReloadCountdown = props => {
  const {
    seconds,
    format,
    action,
    disableCountdown
  } = props;
  return _react.default.createElement("span", {
    title: !disableCountdown ? `Will automatically refresh list every ${seconds} seconds` : ''
  }, _react.default.createElement(_Button.default, {
    icon: "refresh",
    iconSize: "md",
    noShadow: true,
    onClick: action
  }, !disableCountdown && _react.default.createElement(_Countdown.default, {
    seconds: seconds,
    format: format,
    onCountdownTerminated: action
  })));
};

ReloadCountdown.propTypes = { ..._ButtonProps.default,
  seconds: _propTypes.default.number,
  format: _propTypes.default.string,
  action: _propTypes.default.func,
  disableCountdown: _propTypes.default.bool
};
var _default = ReloadCountdown;
exports.default = _default;