"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _Menu = _interopRequireDefault(require("app/components/molecules/Menu/Menu"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Abox Navigation Menu
 */
const MapsMenu = ({
  isAdmin,
  onClick
}) => _react.default.createElement(_Menu.default, {
  className: "block"
}, _react.default.createElement(_MenuItem.default, {
  onClick: onClick,
  name: "Situational Awareness",
  icon: "situational-awareness",
  iconType: "af",
  to: "/legacy/maps"
}));

MapsMenu.propTypes = {
  isAdmin: _propTypes.default.bool.isRequired
};
MapsMenu.defaultProps = {
  isAdmin: false
};

var _default = (0, _recompose.pure)(MapsMenu);

exports.default = _default;