"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const LinkStyle = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "Link__LinkStyle",
  componentId: "sc-1slhcsp-0"
})(["", ""], ({
  nodecoration
}) => nodecoration ? 'text-decoration: none;' : '');

const Link = props => {
  const {
    noDecoration,
    ...linkProps
  } = props; // eslint-disable-line no-unused-vars

  return _react.default.createElement(LinkStyle, _extends({}, linkProps, {
    nodecoration: noDecoration ? 1 : 0
  }));
};

Link.propTypes = {
  noDecoration: _propTypes.default.bool
};
var _default = Link;
exports.default = _default;