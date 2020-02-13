"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _WidgetHeader = _interopRequireDefault(require("app/components/atoms/WidgetHeader/WidgetHeader"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// STYLE IMPORTS
const MenuHeaderStyle = (0, _styledComponents.default)(_WidgetHeader.default).withConfig({
  displayName: "MenuHeader__MenuHeaderStyle",
  componentId: "sc-1oq312t-0"
})(["font-size:.9rem;color:rgba(255,255,255,0.8);border-bottom:solid 1px ", ";"], ({
  theme
}) => theme.base.borderColor);

const MenuText = _styledComponents.default.div.withConfig({
  displayName: "MenuHeader__MenuText",
  componentId: "sc-1oq312t-1"
})(["flex:1;"]);

const MenuHeader = props => {
  const {
    children,
    ...rest
  } = props;
  return _react.default.createElement(MenuHeaderStyle, rest, children && _react.default.createElement(MenuText, null, children));
};

MenuHeader.propTypes = {
  children: _common.ChildrenProp
};
var _default = MenuHeader;
exports.default = _default;