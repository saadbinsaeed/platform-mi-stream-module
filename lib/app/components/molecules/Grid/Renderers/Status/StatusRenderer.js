"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * Renders event status
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const StatusRenderer = ({
  value
} = {}) => {
  return {
    'UNA': _react.default.createElement(_Icon.default, {
      name: "radiobox-blank",
      alt: "Unacknowledged",
      title: "Unacknowledged",
      size: "lg",
      color: "info",
      "data-tip": "Unacknowledged"
    }),
    'ACK': _react.default.createElement(_Icon.default, {
      name: "radiobox-marked",
      alt: "Acknowledged",
      title: "Acknowledged",
      size: "lg",
      color: "primary",
      "data-tip": "Acknowledged"
    }),
    'PRO': _react.default.createElement(_Icon.default, {
      name: "check-circle",
      alt: "Processed",
      title: "Processed",
      size: "lg",
      color: "primary",
      "data-tip": "Processed"
    }),
    'DUP': _react.default.createElement(_Icon.default, {
      name: "plus-circle-multiple-outline",
      alt: "Duplicate",
      title: "Duplicate",
      size: "lg",
      color: "error",
      "data-tip": "Duplicate"
    }),
    'DIS': _react.default.createElement(_Icon.default, {
      name: "delete",
      size: "lg",
      alt: "Discarded",
      title: "Discarded",
      color: "info",
      "data-tip": "Discarded"
    }),
    'ERR': _react.default.createElement(_Icon.default, {
      name: "alert-circle",
      size: "lg",
      alt: "Error",
      title: "Error",
      color: "error",
      "data-tip": "Error"
    }),
    'CLE': _react.default.createElement(_Icon.default, {
      name: "check-all",
      size: "lg",
      alt: "Cleared",
      title: "Cleared",
      color: "primary",
      "data-tip": "Cleared"
    })
  }[value];
};

var _default = (0, _recompose.onlyUpdateForKeys)(['value'])(StatusRenderer);

exports.default = _default;