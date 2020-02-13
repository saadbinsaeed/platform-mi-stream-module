"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _Menu = _interopRequireDefault(require("app/components/molecules/Menu/Menu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Abox Navigation Menu
 */
const DashboardsMenu = ({
  onClick
}) => _react.default.createElement(_Menu.default, {
  className: "block"
}, _react.default.createElement(_MenuItem.default, {
  onClick: onClick,
  name: "Dashboard",
  icon: "dashboard",
  iconType: "af",
  to: "/dashboards"
}), _react.default.createElement(_MenuItem.default, {
  onClick: onClick,
  name: "Dashboard (BETA)",
  icon: "dashboard",
  iconType: "af",
  to: "/dashboards_new"
}));

var _default = (0, _recompose.pure)(DashboardsMenu);

exports.default = _default;