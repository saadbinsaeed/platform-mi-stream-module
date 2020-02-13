"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Common = require("app/utils/styles/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Text = _styledComponents.default.span.withConfig({
  displayName: "Text",
  componentId: "zyagpr-0"
})(["font-size:inherit;overflow:hidden;", ""], _Common.breakText);

var _default = Text;
exports.default = _default;