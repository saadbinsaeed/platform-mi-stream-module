"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputWrapper = _interopRequireDefault(require("app/components/atoms/InputWrapper/InputWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Generate the styled for the ToolBar
 */
const Row = _styledComponents.default.div.withConfig({
  displayName: "ToolBar__Row",
  componentId: "sc-1rwtga5-0"
})(["display:flex;flex-direction:column;background:#343A45;box-shadow:0 1.83px 1px rgba(0,0,0,0.26),0 0 1.33px rgba(0,0,0,0.08);padding:10px 5%;align-items:stretch;@media screen and (min-width:", "){flex-direction:row;padding:5px 0.5rem;}"], ({
  theme
}) => theme.media.md);

const Col = _styledComponents.default.div.withConfig({
  displayName: "ToolBar__Col",
  componentId: "sc-1rwtga5-1"
})(["width:100%;"]);

const ColLeft = (0, _styledComponents.default)(Col).withConfig({
  displayName: "ToolBar__ColLeft",
  componentId: "sc-1rwtga5-2"
})(["display:flex;flex-direction:column;align-items:center;", "{padding:0;width:100%;}&:after{content:'';display:block;background:rgba(255,255,255,0.24);margin:5px 0;width:100%;height:1px;}@media screen and (min-width:", "){flex-direction:row;width:20%;min-width:250px;&:after{margin:0 25px;width:1px;height:24px;}}"], _InputWrapper.default, ({
  theme
}) => theme.media.md);
const ColRight = (0, _styledComponents.default)(Col).withConfig({
  displayName: "ToolBar__ColRight",
  componentId: "sc-1rwtga5-3"
})(["display:flex;flex-direction:column;align-items:center;&:before{content:'';display:block;background:rgba(255,255,255,0.24);margin:5px 0;width:100%;height:1px;}@media screen and (min-width:", "){flex-direction:row;width:auto;&:before{margin:0 25px;width:1px;height:24px;}}"], ({
  theme
}) => theme.media.md);
const ColFull = (0, _styledComponents.default)(Col).withConfig({
  displayName: "ToolBar__ColFull",
  componentId: "sc-1rwtga5-4"
})(["width:100%;input{width:100%;}"]);
/**
 * The Toolbar component.
 */

class ToolBar extends _react.PureComponent {
  render() {
    const {
      leftSide,
      rightSide,
      children,
      className
    } = this.props;
    return _react.default.createElement(Row, {
      className: className
    }, leftSide && _react.default.createElement(ColLeft, {
      middle: "xs",
      xs: 12,
      md: 2
    }, leftSide), _react.default.createElement(ColFull, {
      bottom: "xs",
      xs: 12,
      md: !leftSide && !rightSide ? 12 : !leftSide ? 10 : 9
    }, children && children), rightSide && _react.default.createElement(ColRight, {
      top: "xs",
      xs: 12,
      md: 1
    }, rightSide));
  }

}

_defineProperty(ToolBar, "propTypes", {
  leftSide: _propTypes.default.node,
  rightSide: _propTypes.default.node
});

var _default = ToolBar;
exports.default = _default;