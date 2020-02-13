"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Backdrop = _styledComponents.default.div.withConfig({
  displayName: "Backdrop",
  componentId: "sc-149g3n9-0"
})(["position:absolute;left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;background:", ";z-index:1400;@media(min-width:", "){padding:1rem;}"], ({
  theme
}) => theme.modal.backdrop.background, ({
  theme
}) => theme.media.md);

var _default = (0, _recompose.pure)(Backdrop);

exports.default = _default;