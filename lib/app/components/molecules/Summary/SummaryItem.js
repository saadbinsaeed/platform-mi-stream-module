"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SummaryItemStyle = _styledComponents.default.div.withConfig({
  displayName: "SummaryItem__SummaryItemStyle",
  componentId: "vx2s5n-0"
})(["display:block;padding:1.3rem;text-align:center;background:", ";border-right:solid 1px rgba(0,0,0,0.1);"], ({
  theme
}) => theme.color.background);

const SummaryName = _styledComponents.default.h3.withConfig({
  displayName: "SummaryItem__SummaryName",
  componentId: "vx2s5n-1"
})(["text-transform:uppercase;overflow:hidden;font-weight:600;font-size:.9rem;color:", ";margin:0;"], ({
  theme
}) => theme.summary.nameColor);

const SummaryValue = _styledComponents.default.h4.withConfig({
  displayName: "SummaryItem__SummaryValue",
  componentId: "vx2s5n-2"
})(["font-weight:300;font-size:.9rem;color:", ";margin:0;"], ({
  theme
}) => theme.summary.valueColor);

const SummaryItem = props => {
  // sometime the value can be a string, a boolean, a number
  // or an object that contains a property value
  let value = props.value;

  if (value && value.value) {
    value = value.value;
  }

  return _react.default.createElement(SummaryItemStyle, props, _react.default.createElement(SummaryName, props, props.displayName && String(props.displayName)), _react.default.createElement(SummaryValue, props, value && String(value)));
};

var _default = SummaryItem;
exports.default = _default;