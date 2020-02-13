"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Link = _interopRequireDefault(require("./Link"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders a hyper link
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const HyperLink = ({
  text,
  url,
  internal
}) => {
  if (!text) {
    return null;
  }

  return internal ? _react.default.createElement(_Link.default, {
    to: url
  }, text) : _react.default.createElement("a", {
    href: url
  }, text);
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['text', 'url', 'internal']), (0, _recompose.setPropTypes)({
  text: _propTypes.default.string,
  url: _propTypes.default.string,
  internal: _propTypes.default.bool
}))(HyperLink);

exports.default = _default;