"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _RoundedIndicator = _interopRequireDefault(require("app/components/atoms/RoundedIndicator/RoundedIndicator"));

var _aboxConfig = require("app/config/aboxConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * Renders severity number in an indicator
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const PriorityRenderer = props => {
  /**
   * Render our progress bar based on % value
   */
  const {
    value,
    data: {
      endDate
    },
    theme
  } = props;
  const val = Number(value); // BE sometimes sends priority in a string format

  const validatedPriority = val && val >= 1 && val <= 5 ? val : 3;
  const priorityColor = endDate ? 'disabled' : (0, _aboxConfig.getPriorityColor)(validatedPriority);
  return _react.default.createElement("div", {
    style: {
      display: 'inline-block'
    }
  }, ' ', _react.default.createElement(_RoundedIndicator.default, {
    colorHex: theme.priorityColors[priorityColor],
    count: validatedPriority
  }), ' ');
};

var _default = (0, _styledComponents.withTheme)(PriorityRenderer);

exports.default = _default;