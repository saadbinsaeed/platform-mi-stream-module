"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTinyVirtualList = _interopRequireDefault(require("react-tiny-virtual-list"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("app/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  height,
  ...TinyVirtualListProps
} = _reactTinyVirtualList.default.propTypes; // eslint-disable-line react/forbid-foreign-prop-types

const TinyVirtualListStyled = (0, _styledComponents.default)(_reactTinyVirtualList.default).withConfig({
  displayName: "VirtualList__TinyVirtualListStyled",
  componentId: "v0xpnx-0"
})(["max-height:100%;"]);
/**
 * A TinyVirtualList that takes 100% height.
 */

class VirtualList extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "rowsHeights", []);

    _defineProperty(this, "tinyVirtualListRef", _react.default.createRef());

    _defineProperty(this, "state", {
      height: 0,
      rowsHeights: []
    });

    _defineProperty(this, "updateHeight", () => {
      const parentHeight = (0, _utils.getNum)(this.tinyVirtualListRef, 'current.rootNode.parentNode.clientHeight') || 0;

      if (this.state.height !== parentHeight) {
        this.setState({
          height: parentHeight
        });
      }
    });

    _defineProperty(this, "resize", (index, height) => {
      const rowHeight = this.rowsHeights[index] || this.props.itemSize;

      if (rowHeight !== (height || this.props.itemSize)) {
        this.rowsHeights[index] = height || this.props.itemSize;
        this.setState({
          rowsHeights: this.rowsHeights
        }, () => {
          const ref = this.tinyVirtualListRef.current;
          ref && ref.recomputeSizes(index);
          ref && ref.forceUpdate();
        });
      }
    });

    _defineProperty(this, "renderItem", ({
      index,
      style
    }) => this.props.renderItem({
      index,
      style,
      resize: this.resize
    }));

    _defineProperty(this, "getRowHeight", index => this.state.rowsHeights[index] || this.props.itemSize);

    _defineProperty(this, "getItemSize", itemSize => {
      if (typeof itemSize === 'number') {
        return this.getRowHeight;
      } else {
        return itemSize;
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateHeight);
    window.addEventListener('transitionend', this.updateHeight);
    this.updateHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
    window.removeEventListener('transitionend', this.updateHeight);
  }

  componentDidUpdate(prevProps) {
    const {
      itemCount
    } = this.props;

    if (itemCount !== prevProps.itemCount) {
      this.updateHeight();
    }
  }

  render() {
    const {
      className,
      ...tinyVirtualListOptions
    } = this.props;
    const itemSize = this.getItemSize(this.props.itemSize);
    return _react.default.createElement(TinyVirtualListStyled, _extends({}, tinyVirtualListOptions, {
      innerRef: this.tinyVirtualListRef,
      height: this.state.height,
      renderItem: this.renderItem,
      itemSize: itemSize,
      className: className
    }));
  }

}

_defineProperty(VirtualList, "propTypes", { ...TinyVirtualListProps,
  listRef: _propTypes.default.object,
  className: _propTypes.default.string
});

var _default = VirtualList;
exports.default = _default;