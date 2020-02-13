"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _date = require("app/utils/date/date");

/**
 * @public
 * Format a date.
 *
 * @param {Object} props - the Component's properties
 * @return {ReactDOM} - return a JSX Element
 */
const DateRenderer = ({
  value
}) => (0, _date.formatDate)(value);

var _default = DateRenderer;
exports.default = _default;