"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Chips = require("primereact/components/chips/Chips");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Badge = (0, _styledComponents.default)(_Chips.Chips).withConfig({
  displayName: "Badge",
  componentId: "k4b3x0-0"
})([""]);
var _default = Badge;
exports.default = _default;