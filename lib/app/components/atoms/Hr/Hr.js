"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HrStyle = _styledComponents.default.hr.withConfig({
  displayName: "Hr__HrStyle",
  componentId: "sc-1fbjsj-0"
})(["height:0;border:0;margin:0;border-bottom:solid 1px ", ";"], ({
  theme
}) => 'rgba(255,255,255,0.2)');

const Hr = props => {
  return _react.default.createElement(HrStyle, props);
};

var _default = Hr;
exports.default = _default;