"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ArrowStyle = _styledComponents.default.button.withConfig({
  displayName: "Arrow__ArrowStyle",
  componentId: "r0ul68-0"
})(["position:absolute;top:2rem;cursor:pointer;border:none;background:transparent;", ";"], ({
  right
}) => right ? 'right: 5px' : 'left: 3px');

const Arrow = ({
  name,
  right,
  onClick,
  responsiveConfig
}) => _react.default.createElement(ArrowStyle, {
  responsiveConfig: responsiveConfig,
  right: right,
  onClick: onClick
}, _react.default.createElement(_Icon.default, {
  name: right ? 'arrow-right' : 'arrow-left'
}));

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['name']), (0, _recompose.setPropTypes)({
  name: _propTypes.default.string
}))(Arrow);

exports.default = _default;