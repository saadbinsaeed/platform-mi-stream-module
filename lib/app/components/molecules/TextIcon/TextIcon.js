"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _IconProps = _interopRequireDefault(require("app/components/atoms/Icon/IconProps"));

var _RoundedIndicator = _interopRequireDefault(require("app/components/atoms/RoundedIndicator/RoundedIndicator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TextIconContainer = _styledComponents.default.button.withConfig({
  displayName: "TextIcon__TextIconContainer",
  componentId: "n9zwvh-0"
})(["background:none;border:none 0;outline:none;position:relative;display:inline-block;text-align:center;cursor:pointer;margin:", ";line-height:1.1;text-decoration:none;&:first-child{margin-left:0;}&:last-child{margin-right:0;}"], ({
  margin
}) => margin ? '1rem' : '0');

const TextIconLabel = _styledComponents.default.div.withConfig({
  displayName: "TextIcon__TextIconLabel",
  componentId: "n9zwvh-1"
})(["color:#888;font-size:0.8rem;font-weight:500;text-decoration:none;"]);

const TextIconLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "TextIcon__TextIconLink",
  componentId: "n9zwvh-2"
})(["text-decoration:none;background:none;border:none 0;outline:none;display:inline-block;"]);
const TextIconIndicator = (0, _styledComponents.default)(_RoundedIndicator.default).withConfig({
  displayName: "TextIcon__TextIconIndicator",
  componentId: "n9zwvh-3"
})(["position:absolute;right:0;width:1rem;height:1rem;font-size:0.7rem;"]);

const TextIcon = props => {
  const {
    icon,
    iconType,
    color,
    size,
    label,
    count,
    to,
    type,
    form,
    disabled,
    margin,
    ...rest
  } = props;

  const textIcon = _react.default.createElement(TextIconContainer, _extends({
    margin: margin !== false ? true : false,
    type: type,
    form: form,
    disabled: disabled
  }, rest), count ? _react.default.createElement(TextIconIndicator, {
    count: count,
    color: "warning"
  }) : null, _react.default.createElement(_Icon.default, {
    disabled: disabled,
    name: icon,
    type: iconType,
    color: color,
    size: size
  }), _react.default.createElement(TextIconLabel, null, label));

  return to ? _react.default.createElement(TextIconLink, {
    to: to
  }, textIcon) : textIcon;
};

TextIcon.propTypes = { ..._IconProps.default,
  type: _propTypes.default.string,
  label: _propTypes.default.string
};
var _default = TextIcon;
exports.default = _default;