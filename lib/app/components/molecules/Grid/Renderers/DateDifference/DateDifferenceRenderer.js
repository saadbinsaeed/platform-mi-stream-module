"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return the difference between now and the given date.
 */
const DateDifferenceRenderer = ({
  value
}) => value ? (0, _moment.default)(value).from((0, _moment.default)()) : null;

var _default = DateDifferenceRenderer;
exports.default = _default;