"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _polished = require("polished");

var _Bar = _interopRequireDefault(require("app/components/atoms/Bar/Bar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
const FooterBarStyle = (0, _styledComponents.default)(_Bar.default).withConfig({
  displayName: "FooterBar__FooterBarStyle",
  componentId: "cr5icl-0"
})(["grid-area:pFooter;color:", ";background:", ";height:", ";box-shadow:", ";button{margin:0;}"], ({
  theme
}) => theme.base.textColor, ({
  theme
}) => (0, _polished.lighten)(0.03, theme.base.background), ({
  theme
}) => theme.bar.height, ({
  theme
}) => theme.shadow.z2);

const FooterBar = props => {
  return _react.default.createElement(FooterBarStyle, {
    className: `footer-bar ${props.className}`
  }, props.children);
};

var _default = FooterBar;
exports.default = _default;