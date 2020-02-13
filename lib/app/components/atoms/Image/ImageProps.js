"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ImageProps = {
  size: _common.SizeProps,
  src: _propTypes.default.string,
  rounded: _propTypes.default.bool,
  fluid: _propTypes.default.bool,
  className: _propTypes.default.string,
  alt: _propTypes.default.string,
  width: _propTypes.default.string,
  height: _propTypes.default.string
};
var _default = ImageProps;
exports.default = _default;