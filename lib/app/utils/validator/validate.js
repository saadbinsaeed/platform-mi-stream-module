"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("app/utils/utils");

var _validate = _interopRequireDefault(require("validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isValidType = (value, type) => {
  switch (type) {
    case 'array':
      return Array.isArray(value);

    default:
      return typeof value === type;
  }
};
/**
 * Adding custom validators.
 *
 * WARNING: This is global! Add custom validators only here!
 */


_validate.default.validators.type = (value, options, key, attributes) => {
  if (!(0, _utils.isDefined)(value)) {
    return undefined;
  }

  const type = typeof options === 'object' ? options.type : String(options);

  if (isValidType(value, type)) {
    return undefined;
  }

  const message = typeof options === 'object' ? options.type : `{label} must be a ${String(type)}.`;
  return message;
};

var _default = _validate.default;
exports.default = _default;