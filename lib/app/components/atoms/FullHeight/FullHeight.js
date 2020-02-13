"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("app/utils/propTypes/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FullHeightWrapper = _styledComponents.default.div.withConfig({
  displayName: "FullHeight__FullHeightWrapper",
  componentId: "sc-14s38m1-0"
})(["display:block;", " ", " ", " ", " ", ";"], ({
  withTabs,
  withFooter
}) => !withTabs && !withFooter ? 'height:100%;' : '', ({
  theme,
  withTabs,
  withFooter
}) => withTabs && !withFooter ? `height:calc(100% - ${theme.tabs.tabRow.height});` : '', ({
  theme,
  withTabs,
  withFooter
}) => !withTabs && withFooter ? `height:calc(100% - ${theme.bar.height});` : '', ({
  theme,
  withTabs,
  withFooter
}) => withTabs && withFooter ? `height:calc(100% - (${theme.bar.height} + ${theme.tabs.tabRow.height}));` : '', ({
  scrollY
}) => 'overflow-y:auto' || '');
/**
 * Component that let's you set a full height container
 */


class FullHeight extends _react.Component {
  /**
   * Set PropTypes
   */

  /**
   * Render our fullHeight container
   */
  render() {
    const {
      children,
      withTabs,
      withFooter,
      scrollY,
      ...rest
    } = this.props;
    return _react.default.createElement(FullHeightWrapper, _extends({
      withTabs: withTabs,
      withFooter: withFooter,
      scrollY: scrollY,
      className: 'full-height'
    }, rest), children);
  }

}

_defineProperty(FullHeight, "propTypes", {
  withTabs: _propTypes.default.bool,
  withFooter: _propTypes.default.bool,
  scrollY: _propTypes.default.bool,
  children: _common.ChildrenProp
});

_defineProperty(FullHeight, "defaultProps", {
  withTabs: false,
  withFooter: false
});

var _default = FullHeight;
exports.default = _default;