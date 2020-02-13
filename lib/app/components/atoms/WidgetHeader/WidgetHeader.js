"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WidgetHeader = _styledComponents.default.header.withConfig({
  displayName: "WidgetHeader",
  componentId: "sc-12k1hlu-0"
})(["display:grid;grid-template-columns:auto 1fr auto;align-items:center;padding:1rem 1.2rem 1rem 1.2rem;"]);

var _default = WidgetHeader;
exports.default = _default;