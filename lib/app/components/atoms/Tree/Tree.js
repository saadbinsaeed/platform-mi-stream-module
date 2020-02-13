"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Tree = require("primereact/components/tree/Tree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *  Tree component for DATA
 */
class Tree extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      key: 0
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        key: this.state.key + 1
      });
    }
  }

  render() {
    const {
      value,
      selectionMode,
      selectionChange,
      children
    } = this.props;
    return _react.default.createElement(_Tree.Tree, {
      key: this.state.key,
      value: value,
      selectionMode: selectionMode,
      selectionChange: selectionChange
    }, children);
  }

}

_defineProperty(Tree, "propTypes", {
  value: _propTypes.default.array,
  selectionMode: _propTypes.default.string,
  selectionChange: _propTypes.default.func
});

var _default = Tree;
exports.default = _default;