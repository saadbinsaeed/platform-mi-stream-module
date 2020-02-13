"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Sidebar Style
const SideBarStyle = _styledComponents.default.aside.withConfig({
  displayName: "SideBar__SideBarStyle",
  componentId: "sc-1t6ehca-0"
})(["grid-area:", ";display:", ";background:", ";box-shadow:", ";width:260px;overflow-y:auto;position:absolute;top:0;bottom:0;z-index:99;@media (min-width:", " ){width:", ";position:relative;}"], ({
  rightbar
}) => rightbar ? 'rightbar' : 'sidebar', ({
  opened
}) => opened ? 'block' : 'none', ({
  theme
}) => theme.layout.navigation.background, ({
  theme
}) => theme.shadow.z1, ({
  theme
}) => theme.media.md, ({
  theme
}) => theme.layout.navigation.width);
/**
 * Crate our sidebar for the layout component
 */


class SideBar extends _react.Component {
  /**
  * Render our Layout SideBar Component
  */
  render() {
    const {
      children,
      isOpened,
      isRightBar
    } = this.props;
    return _react.default.createElement(SideBarStyle, _extends({
      rightbar: isRightBar,
      className: "LayoutSidebar"
    }, this.props, {
      opened: isOpened
    }), children);
  }

}

SideBar.propTypes = {
  isOpened: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node])
};
var _default = SideBar;
exports.default = _default;