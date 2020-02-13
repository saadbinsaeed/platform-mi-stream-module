"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Indicator = _styledComponents.default.div.withConfig({
  displayName: "RoundedIndicator__Indicator",
  componentId: "sc-1rs7qdw-0"
})(["display:flex;align-items:center;justify-content:center;width:2em;height:2em;padding:.5em;line-height:3em;text-align:center;border-radius:500rem;color:", ";background:", ";box-shadow:", ";"], ({
  color,
  theme,
  colorHex
}) => theme && (color || colorHex) ? 'white' : theme.base.textColor, ({
  color,
  theme,
  colorHex
}) => theme && (color || colorHex) ? colorHex || theme.color[color] : 'none', ({
  shadow,
  theme
}) => theme && shadow ? theme.shadow.z1 : '');
/**
 * Renders a button.
 *
 * @example <Button color="red" loading icon="delete" onClick="() => { alert('deleted') }" />
 *
 * For a complete list of all the available icons refer to https://materialdesignicons.com/
 */


const RoundedIndicator = props => {
  const {
    count,
    color,
    shadow,
    colorHex,
    ...rest
  } = props;
  return _react.default.createElement(Indicator, _extends({
    count: count,
    colorHex: colorHex,
    color: color,
    shadow: shadow
  }, rest), count);
};

RoundedIndicator.propTypes = {
  count: _propTypes.default.number,
  color: _propTypes.default.string,
  colorHex: _propTypes.default.string,
  shadow: _propTypes.default.bool
};
RoundedIndicator.defaultProps = {
  count: 0,
  color: 'primary',
  colorHex: '',
  shadow: false
};
var _default = RoundedIndicator;
exports.default = _default;