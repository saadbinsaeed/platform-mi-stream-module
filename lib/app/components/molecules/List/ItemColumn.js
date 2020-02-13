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

const ItemColumnStyle = _styledComponents.default.div.withConfig({
  displayName: "ItemColumn__ItemColumnStyle",
  componentId: "sc-48lvgg-0"
})(["", ";padding:.5rem;&:last-child{margin-left:auto;}", ";", ";"], ({
  grow
}) => grow ? 'flex: 1;' : '', ({
  textwrap
}) => textwrap ? 'white-space: wrap;' : 'white-space: nowrap; text-overflow: ellipsis; overflow: hidden;', ({
  shrink
}) => shrink ? 'flex-shrink: 0;' : '');

const ItemColumn = props => {
  const {
    children,
    grow,
    wrap,
    shrink
  } = props;
  return _react.default.createElement(ItemColumnStyle, {
    shrink: shrink,
    textwrap: wrap,
    grow: grow
  }, children);
};

ItemColumn.propTypes = {
  children: _common.ChildrenProp,
  grow: _propTypes.default.bool,
  wrap: _propTypes.default.bool
};
var _default = ItemColumn;
exports.default = _default;