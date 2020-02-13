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

//import { ifProp } from 'styled-tools';
const TitleBase = _styledComponents.default.span.withConfig({
  displayName: "Title__TitleBase",
  componentId: "sc-61ffel-0"
})(["font-weight:500;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;a{color:", ";}"], ({
  theme
}) => theme.base.textColor);

const Title = props => {
  const {
    as
  } = props;
  const setTitleAs = props.as;
  const TitleStyle = TitleBase.withComponent(setTitleAs);
  return _react.default.createElement(TitleStyle, _extends({
    as: as
  }, props), props.children);
};

Title.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.arrayOf(_propTypes.default.node)]),
  as: _common.HeaderTagProps
};
Title.defaultProps = {
  as: 'h3'
};
var _default = Title;
exports.default = _default;