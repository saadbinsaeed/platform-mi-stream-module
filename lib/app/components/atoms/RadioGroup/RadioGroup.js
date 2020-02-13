"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RadioGroupCss = ({
  children
}) => {
  return _react.default.createElement("radiogroup", null, children);
};

const RadioGroup = (0, _styledComponents.default)(RadioGroupCss).withConfig({
  displayName: "RadioGroup",
  componentId: "fvpkqq-0"
})(["font-size:inherit;"]);
var _default = RadioGroup;
exports.default = _default;