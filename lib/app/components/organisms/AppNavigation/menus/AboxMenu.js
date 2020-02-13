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
const AboxMenu = props => _react.default.createElement(_Menu.default, {
  className: "block"
}, _react.default.createElement(_MenuItem.default, {
  onClick: props.onClick,
  name: "Processes",
  icon: "processes",
  iconType: "af",
  to: "/abox/processes"
}), _react.default.createElement(_MenuItem.default, {
  onClick: props.onClick,
  name: "Tasks",
  icon: "task",
  iconType: "af",
  to: "/abox/tasks"
}), _react.default.createElement(_MenuItem.default, {
  onClick: props.onClick,
  name: "Calendar",
  icon: "calendar-blank",
  to: "/abox/calendar"
}), _react.default.createElement(_MenuItem.default, {
  onClick: props.onClick,
  name: "Timeline (Beta)",
  icon: "projects",
  iconType: "af",
  to: "/abox/timeline"
}));

var _default = (0, _recompose.pure)(AboxMenu);

exports.default = _default;