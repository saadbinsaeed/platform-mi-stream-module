"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Menu = _interopRequireDefault(require("app/components/molecules/Menu/Menu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Abox Navigation Menu
 */
const AnalyticsMenu = ({
  isAdmin,
  permissions,
  onClick
}) => {
  const permissionsSet = new Set(permissions);
  return _react.default.createElement(_Menu.default, {
    className: "block"
  }, (isAdmin || permissionsSet.has('intelligence.analytics.view')) && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Analytics",
    iconType: "af",
    icon: "charts",
    to: "/analytics"
  }));
};

var _default = (0, _recompose.pure)(AnalyticsMenu);

exports.default = _default;