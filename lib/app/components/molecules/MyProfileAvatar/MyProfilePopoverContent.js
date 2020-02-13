"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _MenuItem = _interopRequireDefault(require("app/components/molecules/Menu/MenuItem"));

var _affectliSso = _interopRequireDefault(require("app/auth/affectliSso"));

var _lo = require("app/utils/lo/lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MyProfilePopupContent = props => {
  const tokenType = (0, _lo.get)(_affectliSso.default.getRefreshTokenParsed(), 'typ');
  const content = [{
    text: 'Profile',
    icon: 'account',
    isModal: true,
    to: '/profile'
  }, {
    text: 'Support',
    onClick: () => window.open('https://support.affectli.com'),
    icon: 'help-circle',
    isModal: false
  }, {
    text: 'Version 0.79.0',
    icon: 'alert-circle',
    isModal: false
  }, {
    text: tokenType === 'Offline' ? 'Logout (offline mode)' : 'Logout',
    onClick: () => _affectliSso.default.logout(),
    icon: 'logout',
    isModal: false
  }];
  return _react.default.createElement("div", null, content.map(({
    text,
    icon,
    onClick,
    isModal,
    to
  }) => _react.default.createElement(_MenuItem.default, {
    key: text,
    name: text,
    to: to,
    icon: icon,
    onClick: onClick && onClick,
    isModal: true
  })));
};

var _default = MyProfilePopupContent;
exports.default = _default;