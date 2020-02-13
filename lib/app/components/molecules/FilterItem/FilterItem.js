"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Drawer = _interopRequireDefault(require("app/components/atoms/Drawer/Drawer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FilterItemStyle = _styledComponents.default.div.withConfig({
  displayName: "FilterItem__FilterItemStyle",
  componentId: "sc-1prq11z-0"
})(["display:block;padding:.8rem .4rem;border-bottom:solid 1px #333;cursor:pointer;"]);
/**
 * Component to show a filterable item with selectable options
 */


class FilterItem extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleFilters", () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    });

    _defineProperty(this, "openFilters", () => {
      !this.state.isOpen && this.setState({
        isOpen: true
      });
    });

    this.state = {
      isOpen: false
    };
  }

  render() {
    const {
      name,
      value,
      children
    } = this.props;
    return _react.default.createElement(FilterItemStyle, {
      onClick: this.openFilters
    }, _react.default.createElement("strong", null, name), _react.default.createElement("div", null, value), _react.default.createElement(_Drawer.default, {
      title: `${name} filters`,
      isOpen: this.state.isOpen,
      isToggled: this.toggleFilters
    }, _react.default.createElement("div", null, children)));
  }

}

_defineProperty(FilterItem, "propTypes", {
  name: _propTypes.default.string,
  value: _propTypes.default.any,
  children: _propTypes.default.any
});

var _default = FilterItem;
exports.default = _default;