"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HeaderSummaryItemStyle = _styledComponents.default.div.withConfig({
  displayName: "header-summary-item__HeaderSummaryItemStyle",
  componentId: "sc-187hh00-0"
})(["display:block;text-align:center;font-size:.9rem;padding:1rem;@media (min-width:", " ){flex:1;padding:.9rem;}"], ({
  theme
}) => theme.media.md);

const HeaderSummaryItem = props => {
  const {
    children
  } = props;
  return _react.default.createElement(HeaderSummaryItemStyle, props, children);
};

HeaderSummaryItem.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};
var _default = HeaderSummaryItem;
exports.default = _default;