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

const CardHeaderStyle = _styledComponents.default.header.withConfig({
  displayName: "CardHeader__CardHeaderStyle",
  componentId: "tzsxei-0"
})(["display:flex;align-items:center;justify-content:space-between;", " color:", ";background:", ";border-top-left-radius:", ";border-top-right-radius:", ";", ""], ({
  headerPadding
}) => headerPadding ? 'padding: 1rem 1rem 1rem 1rem;' : '', ({
  theme
}) => theme.widget.header.textColor, ({
  theme,
  headerColor
}) => headerColor || theme.widget.header.background, ({
  theme
}) => theme.widget.borderRadius, ({
  theme
}) => theme.widget.borderRadius, ({
  isCollapsed,
  theme
}) => isCollapsed && theme ? `
        border-bottom-left-radius: ${theme.widget.borderRadius};
        border-bottom-right-radius: ${theme.widget.borderRadius};` : '');

const CardHeader = props => {
  const {
    children,
    isCollapsed,
    headerPadding,
    headerColor
  } = props;
  return _react.default.createElement(CardHeaderStyle, _extends({
    headerColor: headerColor,
    headerPadding: headerPadding,
    isCollapsed: isCollapsed
  }, props), children);
};

CardHeader.propTypes = {
  children: _common.ChildrenProp,
  isCollapsed: _propTypes.default.bool
};
var _default = CardHeader;
exports.default = _default;