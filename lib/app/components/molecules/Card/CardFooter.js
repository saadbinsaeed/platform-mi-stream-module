"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _WidgetFooter = _interopRequireDefault(require("app/components/atoms/WidgetFooter/WidgetFooter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CardFooter = (0, _styledComponents.default)(_WidgetFooter.default).withConfig({
  displayName: "CardFooter",
  componentId: "cl84fj-0"
})([""]);
var _default = CardFooter;
exports.default = _default;