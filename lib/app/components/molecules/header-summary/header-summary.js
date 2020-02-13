"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HeaderSummaryStyle = _styledComponents.default.div.withConfig({
  displayName: "header-summary__HeaderSummaryStyle",
  componentId: "sc-1908b93-0"
})(["display:block;@media (min-width:", " ){display:flex;}min-height:29px;"], ({
  theme
}) => theme.media.md);

const HeaderSummary = props => {
  const {
    children
  } = props;
  return _react.default.createElement(HeaderSummaryStyle, props, children);
};

HeaderSummary.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};
var _default = HeaderSummary;
exports.default = _default;