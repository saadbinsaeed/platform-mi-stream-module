"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BarStyle = _styledComponents.default.div.withConfig({
  displayName: "Bar__BarStyle",
  componentId: "sc-1oppf73-0"
})(["display:flex;justify-content:space-between;align-items:center;height:", ";padding:0 1rem;"], ({
  theme
}) => theme.bar.height);

const Bar = props => {
  const {
    children,
    className
  } = props;
  return _react.default.createElement(BarStyle, _extends({}, props, className), children);
};

Bar.propTypes = {
  children: _common.ChildrenProp,
  className: _propTypes.default.string
};
var _default = Bar;
exports.default = _default;