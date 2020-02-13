"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

var _ScrollMinStyle = _interopRequireDefault(require("app/utils/styles/ScrollMinStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NavContentWrapper = _styledComponents.default.div.withConfig({
  displayName: "NavigationContent__NavContentWrapper",
  componentId: "d9e6u9-0"
})(["", ";flex:1;color:", ";font-weight:300;overflow-x:hidden;overflow-y:auto;.block{display:block;border-top:solid 1px ", ";}", ";"], _ScrollMinStyle.default, ({
  theme
}) => theme.navigation.content.text, ({
  theme
}) => theme.base.borderColor, ({
  isLeftOpen
}) => isLeftOpen ? 'width: 100%;' : 'width: 0;');
/**
 * Content for applications navigation
 */


class NavigationContent extends _react.PureComponent {
  /**
   * Wrapper for each applications navigation content
   */
  render() {
    const {
      children,
      isLeftOpen
    } = this.props;
    return _react.default.createElement(NavContentWrapper, {
      isLeftOpen: isLeftOpen
    }, children);
  }

}

_defineProperty(NavigationContent, "propTypes", {
  children: _common.ChildrenProp,
  isLeftOpen: _propTypes.default.bool
});

var _default = NavigationContent;
exports.default = _default;