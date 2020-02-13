"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _VirtualListItem = _interopRequireDefault(require("app/components/molecules/VirtualList/VirtualListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a resizable list item. The child element has to call the resizeRow function every time his hight is changed.
 *
 * Usage example:
 *
 * <ResizableListItem index={index} resize={resize} padding={8}>
 *   {(resizeRow) => <ChildComponent resizeRow={resizeRow} />}
 * </ResizableListItem>
 */
class ResizableListItem extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "ref", _react.default.createRef());

    _defineProperty(this, "resizeRow", () => {
      this.ref.current.resizeRow();
    });
  }

  render() {
    const {
      children,
      ...props
    } = this.props;
    return _react.default.createElement(_VirtualListItem.default, _extends({
      ref: this.ref
    }, props), children(this.resizeRow));
  }

}

_defineProperty(ResizableListItem, "propTypes", { ..._VirtualListItem.default.propTypes,
  children: _propTypes.default.func.isRequired // $FlowFixMe

});

var _default = ResizableListItem;
exports.default = _default;