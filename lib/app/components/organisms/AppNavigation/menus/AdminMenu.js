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
const AdminMenu = ({
  isAdmin,
  permissions,
  onClick
}) => {
  const permissionsSet = new Set(permissions);
  const canSeeUsers = isAdmin || permissionsSet.has('admin.user.view');
  const canSeeGroups = isAdmin || permissionsSet.has('admin.group.view');
  const canSeeSystemLogs = isAdmin || permissionsSet.has('admin.logs.view');
  return _react.default.createElement(_Menu.default, {
    className: "block"
  }, canSeeUsers && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    key: "user",
    name: "User Management",
    icon: "user-management",
    iconType: "af",
    to: "/user-management"
  }), canSeeGroups && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    key: "group",
    name: 'Groups & Permissions',
    icon: "lock",
    to: "/groups"
  }), canSeeSystemLogs && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    key: "logs",
    name: 'System Logs',
    icon: "code-not-equal",
    to: "/logs"
  }));
};

var _default = (0, _recompose.pure)(AdminMenu);

exports.default = _default;