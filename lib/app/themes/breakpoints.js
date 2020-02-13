"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.breakpointsMap = void 0;
const breakpointsMap = {
  xs: 240,
  sm: 640,
  md: 800,
  lg: 1200,
  xl: 1920
};
exports.breakpointsMap = breakpointsMap;

var _default = Object.keys(breakpointsMap).reduce((breakpointMap, size) => {
  breakpointMap[size] = `${breakpointsMap[size]}px`;
  return breakpointMap;
}, {});

exports.default = _default;