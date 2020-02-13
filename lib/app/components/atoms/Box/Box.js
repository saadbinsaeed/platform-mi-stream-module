"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Box = _styledComponents.default.div.withConfig({
  displayName: "Box",
  componentId: "sc-1aizgfi-0"
})(["display:block;padding:1rem;"]);

var _default = Box;
exports.default = _default;