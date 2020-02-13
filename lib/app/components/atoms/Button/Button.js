"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _polished = require("polished");

var _Loader = _interopRequireDefault(require("app/components/atoms/Loader/Loader"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var _ButtonProps = _interopRequireDefault(require("./ButtonProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// { theme: { primary }, color }
const ButtonStyle = _styledComponents.default.button.withConfig({
  displayName: "Button__ButtonStyle",
  componentId: "sc-6nlmy8-0"
})(["cursor:pointer;color:", ";background:", ";border-radius:", ";padding:.45rem .8rem;margin:0 .3rem;&:first-child{margin-left:0;}&:last-child{margin-right:0;}", ";box-shadow:", ";border:0 none;user-select:none;-webkit-tap-highlight-color:transparent;transition:background .3s ease-in-out;&:hover{color:", " !important;background:", " !important;}&.active{color:", " !important;background:", " !important;}&:active{color:", " !important;background:", " !important;}&:focus{color:", " !important;background:", " !important;outline:solid 1px ", " !important;}&:disabled{cursor:default !important;color:", " !important;background:", " !important;}"], ({
  color,
  theme
}) => theme && color ? 'white' : theme.base.textColor, ({
  color,
  theme
}) => theme && color ? theme.color[color] : 'none', ({
  rounded
}) => rounded ? '500rem' : '.2rem', ({
  fluid
}) => fluid ? 'width: 100%' : '', ({
  theme,
  color,
  noShadow
}) => theme && color && !noShadow ? theme.shadow.z1 : 'none', ({
  color,
  theme
}) => theme && color ? 'white' : theme.base.active.textColor, ({
  color,
  theme
}) => theme && color ? (0, _polished.lighten)(0.1, theme.color[color]) : 'none', ({
  color,
  theme
}) => theme && color ? 'white' : theme.base.active.textColor, ({
  color,
  theme
}) => theme && color ? (0, _polished.lighten)(0.1, theme.color[color]) : 'none', ({
  color,
  theme
}) => theme && color ? 'white' : theme.base.active.textColor, ({
  color,
  theme
}) => theme && color ? (0, _polished.lighten)(0.1, theme.color[color]) : 'none', ({
  color,
  theme
}) => theme && color ? 'white' : theme.base.active.textColor, ({
  color,
  theme
}) => theme && color ? (0, _polished.lighten)(0.1, theme.color[color]) : 'none', ({
  color,
  theme
}) => theme && color ? (0, _polished.darken)(0.05, theme.color[color]) : 'none', ({
  theme
}) => theme.base.disabled.textColor, ({
  theme
}) => theme.base.disabled.background);

const ButtonInner = _styledComponents.default.div.withConfig({
  displayName: "Button__ButtonInner",
  componentId: "sc-6nlmy8-1"
})(["display:flex;align-items:center;justify-content:center;"]);
/**
 * Renders a button.
 *
 * @example <Button color="red" loading icon="delete" onClick="() => { alert('deleted') }" />
 *
 * For a complete list of all the available icons refer to https://materialdesignicons.com/
 */


const Button = props => {
  const {
    text,
    color,
    fluid,
    icon,
    iconColor,
    iconType,
    iconSize,
    children,
    loading,
    onClick,
    rounded,
    noShadow,
    ...rest
  } = props;

  if (loading) {
    return _react.default.createElement(ButtonStyle, _extends({
      color: color,
      fluid: fluid,
      rounded: rounded,
      onClick: onClick,
      noShadow: noShadow
    }, rest), _react.default.createElement(ButtonInner, null, _react.default.createElement(_Loader.default, {
      radius: "20"
    })));
  }

  return _react.default.createElement(ButtonStyle, _extends({
    color: color,
    fluid: fluid,
    rounded: rounded,
    onClick: onClick,
    noShadow: noShadow
  }, rest), _react.default.createElement(ButtonInner, null, text, " ", children, " ", icon && _react.default.createElement(_Icon.default, {
    type: iconType,
    name: icon,
    size: iconSize,
    color: iconColor
  })));
};

Button.propTypes = { ..._ButtonProps.default
};
Button.defaultProps = {
  iconType: 'mdi',
  loading: false,
  fluid: false
};
var _default = Button;
exports.default = _default;