"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = require("./App");

var _registerServiceWorker = _interopRequireDefault(require("./registerServiceWorker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.affectli.sso.onReady().then(() => {
  // FIXME: import and use affectliSso here
  _reactDom.default.render(_react.default.createElement(_App.MainApp, null), document.getElementById('root'));

  (0, _registerServiceWorker.default)();
});