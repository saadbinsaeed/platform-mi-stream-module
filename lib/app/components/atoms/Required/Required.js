"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Required = _styledComponents.default.span.withConfig({
  displayName: "Required",
  componentId: "sc-1px3vv8-0"
})(["color:", ";"], ({
  theme
}) => theme.color.error);

var _default = Required;
exports.default = _default;