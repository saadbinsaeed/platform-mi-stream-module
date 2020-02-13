"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ProgressContainer = _styledComponents.default.div.withConfig({
  displayName: "CircularProgressBar__ProgressContainer",
  componentId: "sc-1y7sz37-0"
})([".circle-background{stroke:", ";}.circle-progress{stroke:", ";stroke-linecap:round;stroke-linejoin:round;}.circle-text{font-size:0.8rem;fill:white;}svg{display:block;}"], ({
  color,
  theme
}) => color ? `${color}44` : '#adabab', ({
  color,
  theme
}) => color || 'white');

const CircularProgressBar = props => {
  const {
    size,
    foreignObjectContent,
    ...restProps
  } = props;
  const percentage = props.percentage >= 0 && props.percentage <= 100 ? Math.round(props.percentage) : 0;
  const radius = (props.size - props.borderWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * percentage / 100;
  const content = foreignObjectContent ? _react.default.createElement("foreignObject", {
    x: "7",
    y: "1",
    width: "25",
    height: "30"
  }, foreignObjectContent) : _react.default.createElement("text", {
    className: "circle-text",
    x: "50%",
    y: "50%",
    dy: ".3em",
    textAnchor: "middle"
  }, `${percentage}%`);
  return _react.default.createElement(ProgressContainer, _extends({}, restProps, {
    color: props.color
  }), _react.default.createElement("svg", {
    width: props.size,
    height: props.size,
    viewBox: viewBox,
    fill: "none"
  }, _react.default.createElement("circle", {
    className: "circle-background",
    cx: props.size / 2,
    cy: props.size / 2,
    r: radius,
    strokeWidth: `${props.borderWidth}px`
  }), _react.default.createElement("circle", {
    className: "circle-progress",
    cx: props.size / 2,
    cy: props.size / 2,
    r: radius,
    strokeWidth: `${props.borderWidth}px` // Start progress marker at 12 O`Clock
    ,
    transform: `rotate(-90 ${props.size / 2} ${props.size / 2})`,
    style: {
      strokeDasharray: dashArray,
      strokeDashoffset: dashOffset
    }
  }), content));
};

CircularProgressBar.defaultProps = {
  size: 38,
  borderWidth: 3,
  percentage: 0,
  color: 'white'
};
CircularProgressBar.propTypes = {
  size: _propTypes.default.number,
  borderWidth: _propTypes.default.number,
  percentage: _propTypes.default.number,
  color: _propTypes.default.string,
  foreignObjectContent: _propTypes.default.object
};
var _default = CircularProgressBar;
exports.default = _default;