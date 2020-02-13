"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SelectButton = require("primereact/components/selectbutton/SelectButton");

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Component for showing ordering state
 */
const SelectButtonComponent = ({
  onChange,
  options,
  optionLabel,
  value,
  ...rest
}) => _react.default.createElement(_SelectButton.SelectButton, _extends({
  onChange: onChange,
  options: options,
  optionLabel: optionLabel,
  value: value
}, rest));

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['value']), (0, _recompose.setPropTypes)({
  onChange: _propTypes.default.func,
  options: _propTypes.default.array,
  value: _propTypes.default.any
}))(SelectButtonComponent);

exports.default = _default;