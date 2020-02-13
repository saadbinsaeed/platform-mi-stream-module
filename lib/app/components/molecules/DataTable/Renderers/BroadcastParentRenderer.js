"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Recipient Renderer displays the user group and recipient information
 * @param props the Component's properties.
 */
const BroadcastParentRenderer = ({
  data
}) => {
  return data.parent && _react.default.createElement(_reactRouterDom.Link, {
    to: `/broadcasts/edit/${data.parent.id}`
  }, data.parent.id);
};

var _default = BroadcastParentRenderer;
exports.default = _default;