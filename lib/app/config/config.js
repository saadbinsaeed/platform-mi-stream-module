"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * Determines if the application is running in an iframe
 *
 * @return {boolean} - returns true if app is loaded in iFrame
 */
const isInIFrame = () => {
  return window.self !== window.top;
};
/**
 * @const {Map} CONFIG - map that contains the application configuration parameters
 */


const CONFIG = (0, _Immutable.default)({
  API_ENTRY_POINT: window.localStorage.getItem('API_ENTRY_POINT') || '',
  BASE_PATH: 'platform',
  IN_IFRAME: isInIFrame()
});
var _default = CONFIG;
exports.default = _default;