"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NavApplicationIconPopoverContent = props => {
  const resource_access = _affectliSso.default.getTokenParsed().resource_access;

  const content = [];

  if (typeof resource_access != 'undefined' && resource_access != null) {
    const keys = Object.keys(resource_access);
    const excludeKeys = ['realm-management', 'mi-stream', 'account', 'pentaho', 'broker', 'admin-cli', 'security-admin-console'];
    keys.forEach(key => {
      if (!excludeKeys.includes(key)) {
        content.push({
          key: key,
          name: key,
          onClick: () => window.location.replace(`https://affectli.${key}`)
        });
      }
    });
  }

  return _react.default.createElement("div", null, content.map(({
    key,
    name,
    onClick
  }) => _react.default.createElement(_MenuItem.default, {
    key: key,
    name: name,
    onClick: onClick && onClick
  })));
};

var _default = NavApplicationIconPopoverContent;
exports.default = _default;