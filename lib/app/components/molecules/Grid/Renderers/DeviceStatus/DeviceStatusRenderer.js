"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * Renders a button to show online/offline status
 */
const DeviceStatusRenderer = () => _react.default.createElement("div", null, _react.default.createElement(_Icon.default, {
  name: "check-circle",
  size: "lg",
  color: "primary"
}), "\xA0Online");

var _default = DeviceStatusRenderer;
exports.default = _default;