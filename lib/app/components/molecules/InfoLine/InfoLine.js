"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InfoLineStyle = _styledComponents.default.div.withConfig({
  displayName: "InfoLine__InfoLineStyle",
  componentId: "da1zdk-0"
})(["display:inline-block;margin:0 1rem;"]);

const InfoLabel = (0, _styledComponents.default)(_Text.default).withConfig({
  displayName: "InfoLine__InfoLabel",
  componentId: "da1zdk-1"
})(["font-weight:500;margin-right:.3rem;"]);

const InfoLine = props => {
  const {
    label,
    text
  } = props;
  return _react.default.createElement(InfoLineStyle, null, _react.default.createElement(InfoLabel, null, label), _react.default.createElement(_Text.default, null, text));
};

InfoLine.propTypes = {
  label: _propTypes.default.string,
  text: _propTypes.default.string
};
var _default = InfoLine;
exports.default = _default;