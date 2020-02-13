"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _AboxCircularProgressBar = _interopRequireDefault(require("app/components/atoms/CircularProgressBar/AboxCircularProgressBar"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @public
 * Renders severity number in an indicator
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const ProgressRenderer = (0, _recompose.onlyUpdateForKeys)(['value', 'data'])(props => {
  /**
   * Render our progress bar based on % value
   */
  const {
    value,
    data,
    data: {
      endDate
    },
    foreignObjectContent,
    ...restProps
  } = props;
  const priority = (0, _lo.get)(data, 'variables.priority') || (0, _lo.get)(data, 'priority') || 3; // If process have end date it means that process is closed

  return _react.default.createElement(_AboxCircularProgressBar.default, _extends({}, restProps, {
    percentage: value,
    priority: priority,
    disabled: !!endDate,
    foreignObjectContent: foreignObjectContent
  }));
});
var _default = ProgressRenderer;
exports.default = _default;