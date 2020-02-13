"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _history = require("history");

var _reactRouterRedux = require("react-router-redux");

var _Store = _interopRequireDefault(require("store/Store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hashHistory = (0, _history.createHashHistory)();
/**
 * workaround (@see https://gitlab.mi-c3.com/affectli-project/affcetli-support-issues/issues/2036)
 * FIXME: remove the pushBack method and use the goBack method
 *        when the application will run outside of the Angular context.
 */

hashHistory.pushBack = function pushBack() {
  const historyList = _Store.default.getState().history.list;

  const historyLength = historyList.length;

  if (historyLength >= 2) {
    hashHistory.push(historyList[1].pathname);
  } else if (historyLength === 1) {
    hashHistory.goBack();
  } else {
    hashHistory.push('/abox/tasks');
  }
};
/**
 * Creates an enhanced history that syncs navigation events with the store (https://www.npmjs.com/package/react-router-redux)
 */


const history = (0, _reactRouterRedux.syncHistoryWithStore)(hashHistory, _Store.default);
var _default = history;
exports.default = _default;