"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IFrame = _styledComponents.default.iframe.withConfig({
  displayName: "IFrame",
  componentId: "pberuz-0"
})(["width:100%;height:100%;border-width:0px;"]);

var _default = IFrame;
exports.default = _default;