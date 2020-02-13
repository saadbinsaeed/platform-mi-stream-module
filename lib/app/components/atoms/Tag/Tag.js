"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-nested-ternary */
// LIBRARY IMPORTS
// UI IMPORTS
// STYLE IMPORTS

/**
 * The original plan was to pass the color variable (red, green, blue, primary) and pass that as the background color so it can take the correct color from the theme file.
 * ie theme.color[red]. Theme color red being taken from theme value. So passing name and not hex value.
 * This is basically a quick fix to solve the white background issue. But the implementation of saving colors as hex values is wrong to begin with.
 */
const TagStyle = _styledComponents.default.div.withConfig({
  displayName: "Tag__TagStyle",
  componentId: "sc-173jr44-0"
})(["display:inline-block;font-size:0.8rem;margin:0.1rem;border-radius:1em;color:", ";background:", ";padding:.2rem .7rem;cursor:", ";a,.Icon:before{", ";}"], ({
  color,
  theme
}) => theme && color ? 'white' : theme.base.textColor, ({
  color,
  theme
}) => theme && color ? color !== '#ffffff' ? color : theme.color.primary : theme.color.secondary, ({
  onClick
}) => onClick ? 'pointer' : 'normal', ({
  color,
  theme
}) => theme && theme.isLightColor(color) && 'color: #222B2F !important');

const Tag = props => {
  const {
    name,
    children,
    color,
    className,
    title,
    onClick
  } = props;
  return _react.default.createElement(TagStyle, {
    color: color,
    className: className,
    pill: true,
    title: title,
    onClick: onClick
  }, name, " ", children);
};

Tag.propTypes = {
  name: _propTypes.default.string,
  color: _propTypes.default.string,
  className: _propTypes.default.any,
  children: _common.ChildrenProp
};
var _default = Tag;
exports.default = _default;