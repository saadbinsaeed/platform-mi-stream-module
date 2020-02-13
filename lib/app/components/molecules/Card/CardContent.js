"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _WidgetContent = _interopRequireDefault(require("app/components/atoms/WidgetContent/WidgetContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CardContent = (0, _styledComponents.default)(_WidgetContent.default).withConfig({
  displayName: "CardContent",
  componentId: "sc-1n2udjr-0"
})(["font-size:inherit;padding:0;"]);
var _default = CardContent;
exports.default = _default;