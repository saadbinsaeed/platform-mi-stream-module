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

const TreeMenuWrapper = _styledComponents.default.ul.withConfig({
  displayName: "TreeMenu__TreeMenuWrapper",
  componentId: "n6gg3z-0"
})(["display:flex;flex-direction:column;margin:0;padding:0;"]);
/**
 * Create a tree menu based on a list of items
 */


class TreeMenu extends _react.Component {
  /**
   * Render our tree menu
   */
  render() {
    return _react.default.createElement(TreeMenuWrapper, this.props, this.props.children);
  }

}

TreeMenu.propTypes = {
  children: _propTypes.default.node
};
var _default = TreeMenu;
exports.default = _default;