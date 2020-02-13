"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CardDescription = _styledComponents.default.article.withConfig({
  displayName: "CardDescription",
  componentId: "tqscly-0"
})(["padding:", "rem;"], ({
  descriptionPadding
}) => descriptionPadding ? '1' : '0');

var _default = CardDescription;
exports.default = _default;