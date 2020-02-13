"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _styledTheme = require("styled-theme");

var _IconProps = _interopRequireDefault(require("./IconProps"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const iconSizes = (0, _styledComponents.css)(["font-size:", " !important;"], ({
  size,
  theme
}) => theme.sizes[size].icon);
/* eslint-disable indent */

const IconStyle = _styledComponents.default.i.withConfig({
  displayName: "Icon__IconStyle",
  componentId: "dz0k2y-0"
})(["display:inline-block;text-rendering:auto;line-height:inherit;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-feature-settings:'liga';cursor:", ";&:before{", ";display:block !important;color:", ";text-shadow:", ";}"], ({
  onClick
}) => !!onClick ? 'pointer' : 'normal', iconSizes, ({
  color,
  colorIndex,
  theme,
  hexColor,
  disabled
}) => {
  if (disabled) {
    return theme.base.disabled.textColor;
  }

  if (color) {
    return (0, _styledTheme.palette)(color, colorIndex || 0, true);
  }

  return hexColor || theme.base.textColor;
}, ({
  shadow,
  theme
}) => shadow ? theme.shadow.z3 : 'none');
/* eslint-enable indent */


const Icon = props => {
  const {
    name,
    type,
    size,
    color,
    colorIndex,
    hexColor,
    className,
    ...rest
  } = props;
  return _react.default.createElement(IconStyle, _extends({
    size: size,
    color: color,
    hexColor: hexColor,
    colorIndex: colorIndex,
    className: `Icon ${type} ${type}-${name} ${className}`
  }, rest));
};

Icon.propTypes = { ..._IconProps.default
};
Icon.defaultProps = {
  type: 'mdi',
  size: 'md',
  colorIndex: 0
};
var _default = Icon;
exports.default = _default;