"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Indicator = _styledComponents.default.div.withConfig({
  displayName: "RoundedBarIndicator__Indicator",
  componentId: "sc-1tkmcbc-0"
})(["display:flex;align-items:center;justify-content:center;border:3px solid;border-color:", ";box-shadow:", ";border-right-color:transparent;background-color:transparent;height:2.5rem;width:2.5rem;font-size:0.8rem;border-radius:75px;"], ({
  color,
  theme
}) => theme && color ? theme.color[color] : theme.color.danger, ({
  shadow,
  theme
}) => theme && shadow ? theme.shadow.z1 : '');

const RoundedBarIndicator = ({
  count,
  color,
  shadow,
  ...rest
}) => _react.default.createElement(Indicator, _extends({
  count: count,
  color: color,
  shadow: shadow
}, rest), count, "%");

RoundedBarIndicator.propTypes = {
  count: _propTypes.default.number,
  color: _propTypes.default.string,
  shadow: _propTypes.default.bool
};
RoundedBarIndicator.defaultProps = {
  count: 0,
  color: 'primary',
  shadow: false
};

var _default = (0, _recompose.pure)(RoundedBarIndicator);

exports.default = _default;