"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ButtonProps = {
  text: _propTypes.default.string,
  color: _propTypes.default.string,
  icon: _propTypes.default.string,
  iconType: _common.IconTypeProps,
  iconSize: _common.SizeProps,
  loading: _propTypes.default.bool,
  iconColor: _propTypes.default.string,
  fluid: _propTypes.default.bool,
  children: _common.ChildrenProp,
  rounded: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  noShadow: _propTypes.default.bool
};
var _default = ButtonProps;
exports.default = _default;