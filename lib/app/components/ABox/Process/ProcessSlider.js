"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SummaryItem = _interopRequireDefault(require("app/components/molecules/Summary/SummaryItem"));

var _slider = _interopRequireDefault(require("app/components/molecules/Slider/slider"));

var _summarySliderUtils = require("app/utils/slider/summarySliderUtils");

var _date = require("app/utils/date/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SummaryWrapper = _styledComponents.default.section.withConfig({
  displayName: "ProcessSlider__SummaryWrapper",
  componentId: "sc-1o6e2o3-0"
})(["margin-bottom:1rem;box-shadow:", ";.Icon{&:before{color:", ";}}"], ({
  theme
}) => theme.shadow.z1, ({
  theme
}) => theme.base.textColor);

const ProcessSlider = props => {
  const {
    summary = {}
  } = props;
  const {
    definition = [],
    variables = {}
  } = summary;
  return _react.default.createElement(SummaryWrapper, {
    className: 'summary-wrapper'
  }, _react.default.createElement(_slider.default, _summarySliderUtils.sliderSettings, definition.filter(({
    hide
  }) => !hide).map(({
    label,
    name,
    code
  }, index) => {
    let value = variables[name];

    if (value === undefined && code) {
      try {
        // $FlowFixMe
        value = Function(`var variables = arguments[0]; ${code}`)({
          endDate: variables.endDate && new Date(variables.endDate),
          createDate: new Date(variables.createDate)
        }); // eslint-disable-line
        // code above is really fucked up. I.e. why are we doing something like that?..
      } catch (e) {// console.error(e);
      }
    } else if (name === 'endDateFormatted') {
      value = (0, _date.formatDate)(variables[name]);
    }

    return _react.default.createElement(_SummaryItem.default, {
      key: index,
      displayName: label,
      value: value || 'No Value'
    });
  })));
};

var _default = ProcessSlider;
exports.default = _default;