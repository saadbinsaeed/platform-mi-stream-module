"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleMarker = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
const MapMarkerWrapper = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "SimpleMarker__MapMarkerWrapper",
  componentId: "sc-1utpm3j-0"
})(["position:relative;display:block;"]);
const MapMarkerIconShadow = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "SimpleMarker__MapMarkerIconShadow",
  componentId: "sc-1utpm3j-1"
})(["position:absolute;z-index:0;transform:skewX(-20deg) translateX(5px);&:before{color:black;}"]);
const MapMarketIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "SimpleMarker__MapMarketIcon",
  componentId: "sc-1utpm3j-2"
})(["position:absolute;z-index:1;opacity:1 !important;", ""], ({
  color
}) => color && `color: ${color}`);

const SimpleMarker = ({
  text,
  iconInfo = {}
}) => _react.default.createElement(MapMarkerWrapper, null, _react.default.createElement(MapMarkerIconShadow, {
  name: iconInfo.name || "pin",
  size: "lg"
}), _react.default.createElement(MapMarketIcon, {
  name: iconInfo.name || "pin",
  color: iconInfo.color,
  size: "lg"
}));

exports.SimpleMarker = SimpleMarker;