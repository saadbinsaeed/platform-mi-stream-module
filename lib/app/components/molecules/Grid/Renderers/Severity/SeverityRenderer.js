"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _RoundedIndicator = _interopRequireDefault(require("app/components/atoms/RoundedIndicator/RoundedIndicator"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const style = {
  display: 'inline-block'
};
/**
 * @public
 * Renders severity number in an indicator
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */

const SeverityRenderer = props => {
  const {
    value
  } = props;
  let color = ''; // Set the color based on the theme vars

  switch (value) {
    case 0:
      color = 'success';
      break;

    case 1:
      color = 'error';
      break;

    case 2:
      color = 'alert';
      break;

    case 3:
      color = 'warning';
      break;

    case 4:
      color = 'info';
      break;

    default:
      color = 'success';
  }

  return _react.default.createElement("div", {
    style: style
  }, " ", _react.default.createElement(_RoundedIndicator.default, {
    color: color,
    count: value
  }), " ");
};

var _default = (0, _recompose.compose)((0, _recompose.onlyUpdateForKeys)(['value']), (0, _recompose.setPropTypes)({
  value: _propTypes.default.number
}))(SeverityRenderer);

exports.default = _default;