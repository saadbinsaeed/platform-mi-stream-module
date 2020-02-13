"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProcessCardSummaryItem = _interopRequireDefault(require("app/components/molecules/Summary/ProcessCardSummaryItem"));

var _slider = _interopRequireDefault(require("app/components/molecules/Slider/slider"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _summarySliderUtils = require("app/utils/slider/summarySliderUtils");

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SummaryWrapper = _styledComponents.default.section.withConfig({
  displayName: "ProcessCardSummaryItemContainer__SummaryWrapper",
  componentId: "sc-1yt2e39-0"
})([".Icon{&:before{color:", ";}}.slick-initialized{padding-bottom:.8rem;button.slick-arrow{opacity:0.8;}button.slick-arrow.slick-disabled{opacity:0.1;}}"], ({
  theme
}) => theme.base.textColor);

const ProcessCardSummaryItemContainer = (0, _recompose.onlyUpdateForKeys)(['summary'])(props => {
  const {
    summary
  } = props;
  return _react.default.createElement(SummaryWrapper, null, _react.default.createElement(_slider.default, _summarySliderUtils.sliderSettings, (summary || []).map(({
    key,
    value
  }) => _react.default.createElement(_ProcessCardSummaryItem.default, {
    key: key,
    displayName: key,
    value: value || 'No Value'
  }))));
});
var _default = ProcessCardSummaryItemContainer;
exports.default = _default;