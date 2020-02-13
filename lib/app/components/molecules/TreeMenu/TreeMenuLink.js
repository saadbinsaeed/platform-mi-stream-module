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

const TreeMenuLinkStyle = _styledComponents.default.a.withConfig({
  displayName: "TreeMenuLink__TreeMenuLinkStyle",
  componentId: "sc-4js0ly-0"
})(["display:flex;align-items:center;flex-grow:1;color:", " !important;"], ({
  selected,
  theme
}) => selected && theme ? theme.color.primary : theme.base.color);
/**
 * A link component for the tree menu
 */


class TreeMenuLink extends _react.Component {
  /**
   * Render our tree menu link and attach actions
   */
  render() {
    return _react.default.createElement(TreeMenuLinkStyle, _extends({}, this.props, {
      selected: this.props.selected
    }), this.props.children);
  }

}

TreeMenuLink.propTypes = {
  children: _propTypes.default.node,
  selected: _propTypes.default.bool
};
var _default = TreeMenuLink;
exports.default = _default;