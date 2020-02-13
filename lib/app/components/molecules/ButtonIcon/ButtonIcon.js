"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = _interopRequireDefault(require("app/components/atoms/Button/Button"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ButtonIconStyle = (0, _styledComponents.default)(_Button.default).withConfig({
  displayName: "ButtonIcon__ButtonIconStyle",
  componentId: "sc-1xwfmgo-0"
})(["font-size:", ";padding:0.199em 0.35em;box-shadow:none;", ";", ";", ";", " & .Icon{margin:0;}"], ({
  size,
  theme
}) => theme.iconSize[size], ({
  paddind
}) => paddind ? 'padding: .1rem;' : '', ({
  fluid
}) => fluid ? 'width: 100%;' : '', ({
  rounded
}) => rounded ? 'border-radius: 500rem;' : '', ({
  theme,
  backgroundColor
}) => backgroundColor && theme ? `background: ${theme.color[backgroundColor]}; box-shadow: ${theme.shadow.z1}; ` : '');
const ButtonIconLabel = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "ButtonIcon__ButtonIconLabel",
  componentId: "sc-1xwfmgo-1"
})(["margin-left:1rem;font-size:1rem;color:white;font-weight:500;text-decoration:none;text-align:center;"]);

const ButtonIcon = ({
  padding,
  title,
  type,
  icon,
  size,
  backgroundColor,
  iconColor,
  rounded,
  onClick,
  loading,
  label,
  buttonType,
  ...rest
}) => {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(ButtonIconStyle, _extends({
    type: buttonType,
    color: backgroundColor,
    onClick: loading ? null : onClick,
    size: size,
    loading: loading,
    rounded: rounded,
    title: title
  }, rest), _react.default.createElement(_Icon.default, {
    type: type,
    name: icon,
    color: iconColor,
    size: size
  }), label && _react.default.createElement(ButtonIconLabel, {
    paddind: true
  }, label)));
};

ButtonIcon.propTypes = {
  title: _propTypes.default.string,
  type: _common.IconTypeProps,
  icon: _propTypes.default.string,
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  backgroundColor: _propTypes.default.string,
  iconColor: _propTypes.default.string,
  size: _common.SizeProps,
  loading: _propTypes.default.bool,
  rounded: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  className: _propTypes.default.any,
  buttonType: _propTypes.default.string
};
ButtonIcon.defaultProps = {
  rounded: true,
  buttonType: 'button'
};
var _default = ButtonIcon;
exports.default = _default;