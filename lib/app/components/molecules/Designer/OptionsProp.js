"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Label = _interopRequireDefault(require("app/components/molecules/Label/Label"));

var _appActions = require("store/actions/app/appActions");

var _KeyValuePairTable = _interopRequireDefault(require("app/containers/Classifications/AttributeDetailModal/KeyValuePairTable/KeyValuePairTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const OptionsPropContainerStyle = _styledComponents.default.div.withConfig({
  displayName: "OptionsProp__OptionsPropContainerStyle",
  componentId: "u7uh5i-0"
})(["padding:5px;"]);

const OptionsProp = ({
  label,
  name,
  required,
  icon,
  size,
  gridData,
  gridHeaders,
  ...restProps
}) => _react.default.createElement("div", null, label && _react.default.createElement(_Label.default, {
  htmlFor: name,
  required: required,
  size: size
}, label), _react.default.createElement(OptionsPropContainerStyle, null, _react.default.createElement(_KeyValuePairTable.default, _extends({
  showToastr: _appActions.showToastr,
  name: name,
  gridData: gridData,
  gridHeaders: gridHeaders
}, restProps))));

var _default = OptionsProp;
exports.default = _default;