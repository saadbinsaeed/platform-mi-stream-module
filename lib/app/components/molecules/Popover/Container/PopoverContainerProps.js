"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverContainerProps = {
  width: _propTypes.default.string,
  isOpen: _propTypes.default.bool,
  placement: _common.PlacementProps
};
var _default = PopoverContainerProps;
exports.default = _default;