"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders a link to navigate to the Classification's details view.
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const ClassificationLink = ({
  id,
  label
}) => {
  return !id || !label ? null : _react.default.createElement(_reactRouterDom.Link, {
    to: `/classifications/${encodeURIComponent(id)}/about`
  }, " ", label);
};

ClassificationLink.propTypes = {
  label: _propTypes.default.any,
  id: _propTypes.default.number
};
var _default = ClassificationLink;
exports.default = _default;