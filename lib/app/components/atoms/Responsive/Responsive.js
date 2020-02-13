"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraLargeScreenMin = exports.LargeScreenMin = exports.MediumScreenMin = exports.SmallScreenMin = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResponsive = _interopRequireDefault(require("react-responsive"));

var _breakpoints = require("app/themes/breakpoints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SmallScreenMin = props => _react.default.createElement(_reactResponsive.default, _extends({}, props, {
  minWidth: _breakpoints.breakpointsMap.sm
}));

exports.SmallScreenMin = SmallScreenMin;

const MediumScreenMin = props => _react.default.createElement(_reactResponsive.default, _extends({}, props, {
  minWidth: _breakpoints.breakpointsMap.md
}));

exports.MediumScreenMin = MediumScreenMin;

const LargeScreenMin = props => _react.default.createElement(_reactResponsive.default, _extends({}, props, {
  minWidth: _breakpoints.breakpointsMap.lg
}));

exports.LargeScreenMin = LargeScreenMin;

const ExtraLargeScreenMin = props => _react.default.createElement(_reactResponsive.default, _extends({}, props, {
  minWidth: _breakpoints.breakpointsMap.xl
}));

exports.ExtraLargeScreenMin = ExtraLargeScreenMin;