"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Pill = _styledComponents.default.div.withConfig({
  displayName: "Pill",
  componentId: "sc-1714cmc-0"
})(["display:inline-flex;align-items:center;border-radius:1em;font-weight:500;padding:1px 8px;font-size:.9em;color:", ";background:", ";"], ({
  theme,
  textColor
}) => theme && textColor ? theme.color[textColor] : theme.base.textColor, ({
  theme,
  backgroundColor
}) => theme && backgroundColor ? theme.color[backgroundColor] : theme.color.primary);

Pill.propTypes = {
  textColor: _propTypes.default.string,
  backgroundColor: _propTypes.default.string
};
var _default = Pill;
exports.default = _default;