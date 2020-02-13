"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Block = _interopRequireDefault(require("../Block/Block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InputWrapper = (0, _styledComponents.default)(_Block.default).withConfig({
  displayName: "InputWrapper",
  componentId: "kowbgw-0"
})(["padding:.5rem 0;"]);
var _default = InputWrapper;
exports.default = _default;