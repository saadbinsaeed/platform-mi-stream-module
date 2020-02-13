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
const EtitiesMenu = ({
  isAdmin,
  permissions,
  onClick
}) => {
  const permissionsSet = new Set(permissions);
  return _react.default.createElement(_Menu.default, {
    className: "block"
  }, (isAdmin || permissionsSet.has('entity.thing.view')) && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Things",
    iconType: "af",
    icon: "Things",
    to: "/things"
  }), (isAdmin || permissionsSet.has('entity.person.view')) && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "People",
    icon: "people",
    iconType: "af",
    to: "/people"
  }), (isAdmin || permissionsSet.has('entity.organisation.view')) && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Organisations",
    icon: "organisations",
    iconType: "af",
    to: "/organisations"
  }), (isAdmin || permissionsSet.has('entity.custom.view')) && _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Custom Entities",
    icon: "shape-circle-plus",
    to: "/custom-entities"
  }), (isAdmin || permissionsSet.has('entity.classification.view')) && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Hr.default, null), _react.default.createElement(_MenuItem.default, {
    onClick: onClick,
    name: "Classification Manager",
    icon: "classification-editor",
    iconType: "af",
    to: "/classifications"
  })));
};

var _default = (0, _recompose.pure)(EtitiesMenu);

exports.default = _default;