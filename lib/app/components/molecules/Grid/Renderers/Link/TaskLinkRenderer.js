"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Link = _interopRequireDefault(require("app/components/atoms/Link/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders a link to navigate to the specified Thing
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const TaskLinkRenderer = ({
  value,
  data
}) => value ? _react.default.createElement(_Link.default, {
  to: `/abox/task/${data.id}`
}, value) : null;

TaskLinkRenderer.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  data: _propTypes.default.object // the Thing ID

};
var _default = TaskLinkRenderer;
exports.default = _default;