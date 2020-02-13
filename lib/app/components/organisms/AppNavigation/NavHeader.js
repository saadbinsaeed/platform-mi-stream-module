"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

var _WidgetHeader = _interopRequireDefault(require("app/components/atoms/WidgetHeader/WidgetHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NavHeaderWrapper = (0, _styledComponents.default)(_WidgetHeader.default).withConfig({
  displayName: "NavHeader__NavHeaderWrapper",
  componentId: "sc-1pr3t82-0"
})(["color:", ";font-weight:500;"], ({
  theme
}) => theme.navigation.content.text);
/**
 * Content for applications navigation
 */

class NavHeader extends _react.PureComponent {
  /**
   * Wrapper for each applications navigation content
   */
  render() {
    const {
      children
    } = this.props;
    return _react.default.createElement(NavHeaderWrapper, null, children);
  }

}

_defineProperty(NavHeader, "propTypes", {
  children: _common.ChildrenProp
});

var _default = NavHeader;
exports.default = _default;