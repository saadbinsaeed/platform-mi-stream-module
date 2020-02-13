"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UI IMPORTS
// STYLE IMPORTS
const ListItemStyle = _styledComponents.default.div.withConfig({
  displayName: "ListItemBase__ListItemStyle",
  componentId: "qajyfu-0"
})(["align-items:center;overflow:hidden;text-overflow:ellipsis;margin:0;", ";", ";"], ({
  raised,
  theme
}) => theme && raised ? `box-shadow: ${theme.shadow.z1}; padding: .5rem; background: ${theme.widget.background}; margin-bottom: 1rem; ` : 'padding: .5rem 0;', ({
  small
}) => small ? 'padding: 0; font-size: 0.8rem' : '');

var _default = (0, _recompose.compose)(_recompose.pure, (0, _recompose.setPropTypes)({
  onClick: _propTypes.default.func,
  raised: _propTypes.default.bool,
  small: _propTypes.default.bool,
  children: _propTypes.default.any
}))(ListItemStyle);

exports.default = _default;