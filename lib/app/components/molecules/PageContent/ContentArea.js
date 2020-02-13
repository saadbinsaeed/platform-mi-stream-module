"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ContentAreaStyle = _styledComponents.default.div.withConfig({
  displayName: "ContentArea__ContentAreaStyle",
  componentId: "rcei2l-0"
})(["position:relative;grid-area:pContent;display:block;overflow:auto;max-height:100%;"]);

const ContentArea = ({
  children,
  style,
  innerRef
}) => _react.default.createElement(ContentAreaStyle, {
  innerRef: innerRef,
  className: 'content-area',
  style: style
}, children);

var _default = ContentArea;
exports.default = _default;