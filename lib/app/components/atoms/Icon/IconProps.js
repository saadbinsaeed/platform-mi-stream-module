"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IconProps = {
  name: _propTypes.default.string,
  size: _common.SizeProps,
  type: _common.IconTypeProps,
  color: _propTypes.default.string,
  className: _propTypes.default.string,
  shadow: _propTypes.default.bool,
  colorIndex: _propTypes.default.number
};
var _default = IconProps;
exports.default = _default;