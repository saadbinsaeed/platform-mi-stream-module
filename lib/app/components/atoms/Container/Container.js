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

const ContainerStyle = _styledComponents.default.div.withConfig({
  displayName: "Container__ContainerStyle",
  componentId: "ciwj77-0"
})(["display:block;position:relative;padding:", ";max-width:", ";margin:", ";"], ({
  noPadding
}) => noPadding ? '0' : '1rem', ({
  width
}) => width ? `${width}px` : '', ({
  leftAligned
}) => leftAligned ? '' : '0 auto');

const Container = props => {
  return _react.default.createElement(ContainerStyle, props, props.children);
};

Container.propTypes = {
  width: _propTypes.default.string,
  leftAligned: _propTypes.default.bool,
  noPadding: _propTypes.default.bool,
  isStyled: _propTypes.default.bool,
  children: _common.ChildrenProp
};
var _default = Container;
exports.default = _default;