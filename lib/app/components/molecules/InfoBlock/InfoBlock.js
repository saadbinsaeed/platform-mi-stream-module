"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Label = _interopRequireDefault(require("../Label/Label"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _Text = _interopRequireDefault(require("app/components/atoms/Text/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InfoBlockStyle = _styledComponents.default.div.withConfig({
  displayName: "InfoBlock__InfoBlockStyle",
  componentId: "sc-1cpqtkz-0"
})(["font-size:inherit;&:not(:last-child){margin-bottom:1rem;}label{margin-bottom:0;}"]);

const InfoBlock = props => {
  const {
    label,
    icon,
    text,
    type
  } = props;
  return _react.default.createElement(InfoBlockStyle, null, _react.default.createElement(_Label.default, null, label), _react.default.createElement(_Icon.default, {
    name: icon,
    type: type,
    size: "sm"
  }), " ", _react.default.createElement(_Text.default, null, text));
};

InfoBlock.propTypes = {
  label: _propTypes.default.string,
  icon: _propTypes.default.string,
  text: _propTypes.default.string,
  type: _propTypes.default.string
};
InfoBlock.defaultProps = {
  type: 'mdi'
};
var _default = InfoBlock;
exports.default = _default;