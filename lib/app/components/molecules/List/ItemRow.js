"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UI IMPORTS
// STYLE IMPORTS
const ItemRowStyle = _styledComponents.default.div.withConfig({
  displayName: "ItemRow__ItemRowStyle",
  componentId: "cij10a-0"
})(["display:flex;flex-wrap:", ";align-items:center;overflow:hidden;text-overflow:ellipsis;flex:1;margin:0;list-style:none;"], ({
  wrap
}) => wrap ? 'wrap' : 'nowrap');

const ItemRow = props => {
  const {
    className,
    children,
    wrap
  } = props;
  return _react.default.createElement(ItemRowStyle, {
    wrap: wrap ? 1 : 0,
    className: className
  }, children);
};

var _default = (0, _recompose.compose)(_recompose.pure, (0, _recompose.setPropTypes)({
  children: _propTypes.default.any
}))(ItemRow);

exports.default = _default;