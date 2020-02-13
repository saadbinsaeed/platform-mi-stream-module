"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Tooltip = require("primereact/components/tooltip/Tooltip");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _IconProps = _interopRequireDefault(require("app/components/atoms/Icon/IconProps"));

var _Image = _interopRequireDefault(require("app/components/atoms/Image/Image"));

var _Popover = _interopRequireDefault(require("app/components/molecules/Popover/Popover"));

var _NavApplicationIconPopoverContent = _interopRequireDefault(require("./NavApplicationIconPopoverContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AppIconButton = _styledComponents.default.div.withConfig({
  displayName: "NavApplicationIcon__AppIconButton",
  componentId: "sc-12hkhod-0"
})(["padding:1rem 0;"]);

const AppIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "NavApplicationIcon__AppIcon",
  componentId: "sc-12hkhod-1"
})(["display:block;line-height:1;&:before{color:rgba(255,255,255,0.4);}"]);
const AppImage = (0, _styledComponents.default)(_Image.default).withConfig({
  displayName: "NavApplicationIcon__AppImage",
  componentId: "sc-12hkhod-2"
})(["background:white;"]);

const NavApplicationIcon = props => {
  const {
    name,
    type,
    image,
    title,
    ...rest
  } = props;

  const ApplicationIcon = () => _react.default.createElement(AppIconButton, _extends({
    id: `${name}-${type}`
  }, rest, {
    title: title
  }), !image && _react.default.createElement(AppIcon, _extends({
    name: name,
    type: type,
    size: "lg"
  }, rest)), image && _react.default.createElement(AppImage, _extends({
    src: image,
    size: "lg",
    rounded: true
  }, rest)));

  return _react.default.createElement("div", null, _react.default.createElement(_Tooltip.Tooltip, {
    for: `${name}-${type}`,
    title: title,
    tooltipPosition: "right"
  }), name === 'process-call-conversation' ? _react.default.createElement(_Popover.default, {
    placement: "middle right",
    width: "260px",
    content: _react.default.createElement(_NavApplicationIconPopoverContent.default, null)
  }, _react.default.createElement(ApplicationIcon, null)) : _react.default.createElement(ApplicationIcon, null));
};

NavApplicationIcon.propTypes = { ..._IconProps.default
};
var _default = NavApplicationIcon;
exports.default = _default;