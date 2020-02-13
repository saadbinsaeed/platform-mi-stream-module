"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HeaderActions = _styledComponents.default.div.withConfig({
  displayName: "HeaderActions",
  componentId: "sc-15swfza-0"
})(["display:flex;margin-left:auto;padding-right:", "rem;"], ({
  headerPadding
}) => headerPadding ? '0' : '0.5');

var _default = HeaderActions;
exports.default = _default;