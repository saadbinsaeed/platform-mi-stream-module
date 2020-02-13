"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SplitButton = require("primereact/components/splitbutton/SplitButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SplitButtonCss = (0, _styledComponents.default)(_SplitButton.SplitButton).withConfig({
  displayName: "SplitButton__SplitButtonCss",
  componentId: "sc-1t6c51i-0"
})([".ui-button{border-top-left-radius:3px !important;border-bottom-left-radius:3px !important;}"]);

const SplitButton = props => {
  const {
    label,
    icon,
    onClick,
    items,
    appendTo
  } = props;
  return _react.default.createElement(SplitButtonCss, {
    label: label,
    icon: icon,
    onClick: onClick,
    model: items,
    appendTo: appendTo
  });
};

SplitButton.propTypes = {
  label: _propTypes.default.string,
  icon: _propTypes.default.string,
  onClick: _propTypes.default.func,
  items: _propTypes.default.array,
  appendTo: _propTypes.default.object
};
var _default = SplitButton;
exports.default = _default;