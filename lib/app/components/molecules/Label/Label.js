"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Required = _interopRequireDefault(require("app/components/atoms/Required/Required"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Styles
const InputLabelStyle = _styledComponents.default.label.withConfig({
  displayName: "Label__InputLabelStyle",
  componentId: "sc-1c013ix-0"
})(["display:block;font-size:.9rem;font-weight:500;text-transform:capitalize;color:", ";"], ({
  theme
}) => theme.base.textColor); // Component


const Label = props => {
  return _react.default.createElement(InputLabelStyle, _extends({}, props, {
    className: props.className
  }), props.children || props.text, " ", props.required && _react.default.createElement(_Required.default, null, "*"));
};

Label.propTypes = {
  required: _propTypes.default.bool,
  children: _common.ChildrenProp,
  size: _common.SizeProps,
  className: _propTypes.default.string,
  text: _propTypes.default.string
};
var _default = Label;
exports.default = _default;