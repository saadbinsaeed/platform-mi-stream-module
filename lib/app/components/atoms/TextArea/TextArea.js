"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _InputTextarea = require("primereact/components/inputtextarea/InputTextarea");

var _recompose = require("recompose");

var _onChange = require("app/utils/input/onChange");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TextAreaStyle = (0, _styledComponents.default)(_InputTextarea.InputTextarea).withConfig({
  displayName: "TextArea__TextAreaStyle",
  componentId: "sij8vf-0"
})([""]);

const TextArea = ({
  children,
  rows,
  cols,
  value,
  autoResize,
  disabled,
  onChange,
  name
}) => _react.default.createElement(TextAreaStyle, {
  name: name,
  rows: rows,
  cols: cols,
  value: value,
  autoResize: autoResize,
  disabled: disabled,
  onChange: _onChange.onChangeFix.bind(null, onChange)
}, children);

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['rows', 'cols', 'children', 'value', 'autoResize', 'onChange', 'disabled', 'name']), (0, _recompose.setPropTypes)({
  rows: _propTypes.default.number,
  cols: _propTypes.default.number,
  children: _propTypes.default.any,
  value: _propTypes.default.string,
  name: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func
}))(TextArea);

exports.default = _default;