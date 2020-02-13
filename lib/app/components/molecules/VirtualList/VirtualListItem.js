"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a list item.
 *
 * Usage example:
 *
 * <ListItem index={index} resize={resize} padding={8}>
 *   <ChildComponent />
 * </ListItem>
 */
class VirtualListItem extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "ref", _react.default.createRef());

    _defineProperty(this, "willUnmount", false);

    _defineProperty(this, "resizeRow", () => {
      const {
        index,
        resize,
        style
      } = this.props;
      const padding = (this.props.padding || 10) * 2;
      const componentHeight = this.ref.current && this.ref.current.children[0].clientHeight;
      const height = componentHeight + padding; // we need to resize if the style.height is less than the components height
      // or if the component height is less that style.height - 12

      const isDifferent = style.height !== height;
      const needResize = isDifferent && (style.height < height || height < style.height - 12);

      if (needResize) {
        resize(index, componentHeight + padding);
      }
    });
  }

  componentDidMount() {
    setTimeout(() => !this.willUnmount && this.resizeRow(), 200);
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }

  render() {
    const {
      style,
      children
    } = this.props;
    return _react.default.createElement("div", {
      ref: this.ref,
      style: style
    }, children);
  }

}

_defineProperty(VirtualListItem, "propTypes", {
  style: _propTypes.default.object.isRequired,
  index: _propTypes.default.number.isRequired,
  resize: _propTypes.default.func.isRequired,
  padding: _propTypes.default.number,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired // $FlowFixMe

});

var _default = VirtualListItem;
exports.default = _default;