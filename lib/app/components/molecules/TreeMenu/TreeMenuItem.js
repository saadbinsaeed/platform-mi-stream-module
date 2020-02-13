"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("app/components/atoms/Icon/Icon"));

var _TreeMenuChildren = _interopRequireDefault(require("./TreeMenuChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TreeMenuItemWrapper = _styledComponents.default.li.withConfig({
  displayName: "TreeMenuItem__TreeMenuItemWrapper",
  componentId: "sc-1touacf-0"
})(["display:block;font-size:.9rem;display:block;"]);

const TreeMenuItemStyle = _styledComponents.default.div.withConfig({
  displayName: "TreeMenuItem__TreeMenuItemStyle",
  componentId: "sc-1touacf-1"
})(["display:flex;align-items:center;padding:.5rem;background-color:", ";"], ({
  selected
}) => selected ? '' : '');

const TreeMenuIcon = (0, _styledComponents.default)(_Icon.default).withConfig({
  displayName: "TreeMenuItem__TreeMenuIcon",
  componentId: "sc-1touacf-2"
})(["margin:.5rem;transition:transform .3s ease-in-out;transform:rotate(", ");"], ({
  rotated
}) => rotated ? '90deg' : '0deg');
const TreeMenuIconDisabled = (0, _styledComponents.default)(TreeMenuIcon).withConfig({
  displayName: "TreeMenuItem__TreeMenuIconDisabled",
  componentId: "sc-1touacf-3"
})(["visibility:hidden;opacity:0;"]);
/**
 * Our tree menu item is each item in the list
 */

class TreeMenuItem extends _react.Component {
  /**
   * @param props the Component's properties
   */
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    this.state = {
      open: !!props.open
    };
    this.toggleChildren = this.toggleChildren.bind(this);
  }
  /**
   * Shoe/Hide the children.
   */


  toggleChildren() {
    this.setState({
      open: !this.state.open
    });
    this.props.onToggle && this.props.onToggle();
  }
  /**
   * Render our tree menu
   */


  render() {
    const {
      open
    } = this.state;
    const {
      childTree,
      children
    } = this.props;
    return _react.default.createElement(TreeMenuItemWrapper, this.props, _react.default.createElement(TreeMenuItemStyle, _extends({}, this.props, {
      selected: open
    }), (childTree || []).length > 0 ? _react.default.createElement(TreeMenuIcon, {
      rotated: open,
      name: "arrow-right",
      size: "sm",
      onClick: this.toggleChildren
    }) : _react.default.createElement(TreeMenuIconDisabled, {
      name: "arrow-right",
      size: "sm"
    }), children), childTree && _react.default.createElement(_TreeMenuChildren.default, {
      show: open
    }, childTree));
  }

}

TreeMenuItem.propTypes = {
  children: _propTypes.default.node,
  childTree: _propTypes.default.node
};
var _default = TreeMenuItem;
exports.default = _default;