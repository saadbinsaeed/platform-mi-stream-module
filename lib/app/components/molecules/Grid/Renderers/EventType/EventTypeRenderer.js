"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * Renders event type
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const EventTypeRenderer = props => {
  return _react.default.createElement("div", null, String(props.value || '').replace(/^(.*)([A-Z].+)$/g, '$1 $2'));
};

var _default = EventTypeRenderer;
exports.default = _default;