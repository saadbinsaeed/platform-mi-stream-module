"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PanelContentStyle = _styledComponents.default.div.withConfig({
  displayName: "PanelContent__PanelContentStyle",
  componentId: "sc-18g0mq9-0"
})(["padding:", ";"], ({
  padding,
  theme
}) => theme && padding ? `${padding}rem` : '1rem');

const PanelContent = props => {
  const {
    children
  } = props;
  return _react.default.createElement(PanelContentStyle, props, children);
};

PanelContent.propTypes = {
  children: _common.ChildrenProp
};
var _default = PanelContent;
exports.default = _default;