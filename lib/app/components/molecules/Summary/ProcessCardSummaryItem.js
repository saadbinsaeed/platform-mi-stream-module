"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SummaryItemStyle = _styledComponents.default.div.withConfig({
  displayName: "ProcessCardSummaryItem__SummaryItemStyle",
  componentId: "wpqd9d-0"
})(["display:block;text-align:center;border-right:solid 1px rgba(0,0,0,0.1);"]);

const SummaryKey = _styledComponents.default.h3.withConfig({
  displayName: "ProcessCardSummaryItem__SummaryKey",
  componentId: "wpqd9d-1"
})(["text-transform:uppercase;overflow:hidden;font-weight:400;font-size:0.6rem;color:", ";margin:0;"], ({
  theme
}) => theme.summary.nameColor);

const SummaryValue = _styledComponents.default.h3.withConfig({
  displayName: "ProcessCardSummaryItem__SummaryValue",
  componentId: "wpqd9d-2"
})(["text-transform:uppercase;overflow:hidden;font-weight:600;font-size:0.8rem;color:", ";margin:0;"], ({
  theme
}) => theme.summary.nameColor);

const ProcessCardSummaryItem = props => {
  return _react.default.createElement(SummaryItemStyle, props, _react.default.createElement(SummaryKey, props, props.displayName.toString()), _react.default.createElement(SummaryValue, props, props.value.toString()));
};

var _default = ProcessCardSummaryItem;
exports.default = _default;