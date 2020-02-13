"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * Format a boolean value.
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const BooleanRenderer = ({
  value,
  isTrue
}) => {
  if (isTrue) {
    return isTrue(value) ? _react.default.createElement(_Icon.default, {
      name: "checkbox-marked"
    }) : _react.default.createElement(_Icon.default, {
      name: "checkbox-blank-outline"
    });
  }

  return value ? _react.default.createElement(_Icon.default, {
    name: "checkbox-marked"
  }) : _react.default.createElement(_Icon.default, {
    name: "checkbox-blank-outline"
  });
};

BooleanRenderer.propTypes = {
  value: _propTypes.default.any,
  isTrue: _propTypes.default.func
};
var _default = BooleanRenderer;
exports.default = _default;