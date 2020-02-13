"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _Menu = _interopRequireDefault(require("app/components/molecules/Menu/Menu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _Hr = _interopRequireDefault(require("app/components/atoms/Hr/Hr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Abox Navigation Menu
 */
const EventsMenu = ({
  isAdmin,
  permissions,
  onClick
}) => {
  const permissionsSet = new Set(permissions);
  return _react.default.createElement(_Menu.default, {
    className: "block"
  }, (isAdmin || permissionsSet.has('mistream.events.view')) && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Events Monitor",
    iconType: "af",
    icon: "event-monitor",
    to: "/events"
  }), (isAdmin || permissionsSet.has('mistream.main.view')) && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Mi-Stream",
    iconType: "af",
    icon: "stream",
    to: "/events/mi-stream"
  }), isAdmin && window.location.href.includes('dev') && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Dashboards",
    iconType: "af",
    icon: "dashboard"
  }), _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Hr.default, null), _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "AI",
    icon: "lightbulb-on"
  }))));
};

var _default = (0, _recompose.pure)(EventsMenu);

exports.default = _default;