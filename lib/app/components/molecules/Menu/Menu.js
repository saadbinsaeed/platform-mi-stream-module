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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// UI IMPORTS
// STYLE IMPORTS
const MenuStyle = _styledComponents.default.ul.withConfig({
  displayName: "Menu__MenuStyle",
  componentId: "sh84ur-0"
})(["display:block;width:100%;margin:0;padding:0;list-style:none;"]);

const Menu = props => {
  const {
    children,
    className,
    ...rest
  } = props;
  return _react.default.createElement(MenuStyle, _extends({
    className: `Menu ${className}`
  }, rest), children);
};

Menu.propTypes = {
  children: _common.ChildrenProp,
  className: _propTypes.default.string
};
var _default = Menu;
exports.default = _default;