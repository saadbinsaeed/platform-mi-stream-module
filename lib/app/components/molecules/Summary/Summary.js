"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _summarySliderUtils = require("app/utils/slider/summarySliderUtils");

var _SummaryItem = _interopRequireDefault(require("./SummaryItem"));

var _Slider = _interopRequireDefault(require("../Slider"));

var _date = require("app/utils/date/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SummaryWrapper = _styledComponents.default.section.withConfig({
  displayName: "Summary__SummaryWrapper",
  componentId: "lme1t2-0"
})(["margin-bottom:1rem;box-shadow:", ";.Icon{&:before{color:", ";}}"], ({
  theme
}) => theme.shadow.z1, ({
  theme
}) => theme.base.textColor);

const formatValue = (meta, value) => {
  const {
    type,
    text_ext,
    text_ext_position,
    kind
  } = meta || {};
  let val = value;

  switch (type) {
    case 'timestamp':
      val = (0, _date.displayByKind)(kind, value);
      break;

    case 'bool':
      val = value ? 'Yes' : 'No';
      break;

    case 'custom':
      if (value && typeof value === 'object' && value.id !== undefined && value.name !== undefined) {
        val = `${value.name} (${value.id})`;
      }

      break;

    default:
  }

  if (text_ext_position && text_ext) {
    return text_ext_position === 'before' ? `${text_ext}${val}` : `${val}${text_ext}`;
  }

  return val;
};

const generateReactElement = ({
  values,
  metadata
}) => {
  const keys = Object.keys(values);
  return keys.map((key, i) => {
    const meta = metadata[key];
    const value = formatValue(meta, values[key]);
    const label = meta && meta.name;
    return _react.default.createElement("div", {
      key: i
    }, _react.default.createElement(_SummaryItem.default, {
      key: i,
      displayName: label,
      value: value || ''
    }));
  });
};

const Summary = ({
  values,
  metadata
}) => {
  if (!values || !Object.keys(values).length) {
    return null;
  }

  const elements = generateReactElement({
    values,
    metadata
  });
  return _react.default.createElement(SummaryWrapper, null, _react.default.createElement(_Slider.default, _summarySliderUtils.sliderSettings, elements));
};

var _default = Summary;
exports.default = _default;